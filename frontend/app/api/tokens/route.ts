import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';
// import axios from 'axios';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { NextRequest } from 'next/server';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';
import { Metaplex } from "@metaplex-foundation/js";



export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('publicKey');

    if (!searchQuery) {
        return new Response('Public key is required', { status: 400 });
    }

    try {
        const { solBalance, tokenBalances } = await getBalances(searchQuery);
        return new Response(JSON.stringify({ solBalance, tokenBalances }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response((error as Error).message, { status: 500 });
    }
}

export const getBalances = async (publicKey: string) => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const pubKey = new PublicKey(publicKey);


    // Initialize Metaplex
    const metaplex = Metaplex.make(connection);

    // Get native SOL balance
    const solAccountInfo = await connection.getAccountInfo(pubKey);
    if (!solAccountInfo) {
        throw new Error('Failed to find account');
    }
    const solBalance = solAccountInfo.lamports / LAMPORTS_PER_SOL;

    // find sol info from this token registry
    // Load token registry
    const tokenRegistry = await new TokenListProvider().resolve();
    const tokenList = tokenRegistry.getList();
    //console.log("tokenList from registry -----> ", tokenList);
    const solTokenInfo = tokenList.find((token: TokenInfo) => token.symbol === 'SOL');



    // const response1 = await axios.get(`https://price-server.chaidex.com/coins/price-convert?amount=${solBalance}&symbol=SOL&convert=USD`);
    // const dataa = response1.data;

    // console.log("token balance in usd", dataa);
    // solBalance = dataa.convertedPrice;




    // Get SPL Token balances
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubKey, { programId: TOKEN_PROGRAM_ID });

    const tokenBalances: { [mint: string]: { balance: number, decimals: number, name: string, symbol: string, logoURI: string | null } } = {};
    if (solTokenInfo) {
        tokenBalances[solTokenInfo.address] = {
            balance: solBalance,
            decimals: 9, // SOL has 9 decimals
            name: solTokenInfo.name,
            symbol: solTokenInfo.symbol,
            logoURI: solTokenInfo.logoURI ?? null,
        };
    }


    for (const tokenAccount of tokenAccounts.value) {
        const mintAddress = tokenAccount.account.data.parsed.info.mint;
        const tokenAmount = tokenAccount.account.data.parsed.info.tokenAmount;

        // Try to get metadata from Metaplex
        let metadata;
        try {
            metadata = await metaplex.nfts().findByMint({ mintAddress: new PublicKey(mintAddress) });
        } catch (error) {
            //console.log(error);
            console.warn(`Metadata not found for mint: ${mintAddress}`);
        }

        // Find token metadata from the registry
        const tokenInfo = tokenList.find((token: TokenInfo) => token.address === mintAddress);

        tokenBalances[mintAddress] = {
            balance: Number(tokenAmount.amount) / Math.pow(10, tokenAmount.decimals),
            decimals: tokenAmount.decimals,
            name: metadata?.name || tokenInfo?.name || "Unknown Token",
            symbol: metadata?.symbol || tokenInfo?.symbol || "UNKNOWN",
            logoURI: metadata?.json?.image || tokenInfo?.logoURI || null,
        };
    }

    return { solBalance, tokenBalances };
};

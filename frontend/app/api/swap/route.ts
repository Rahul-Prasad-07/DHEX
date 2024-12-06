import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from '@/app/db';
import { Keypair, VersionedTransaction } from "@solana/web3.js";
import { connection } from "@/app/lib/constants";


export async function POST(req: NextRequest) {

    const data: {
        quoteResponse: any
    } = await req.json();

    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 401
        })
    }

    const SolWallet = await db.solWallet.findFirst({
        where: {
            userId: session.user.uid
        },
    })

    if (!SolWallet) {
        return NextResponse.json({
            message: "No Solana Wallet Found"
        }, {
            status: 404
        })
    }

    // get serialized transactions for the swap
    // deserialize the transaction
    // Execute the transaction


    try {
        const response = await fetch('https://quote-api.jup.ag/v6/quote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quoteResponse: data.quoteResponse,
                userPublicKey: SolWallet.publicKey,
                wrapAndUnwrapSol: true,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Jupiter API Error: ${response.status} - ${errorText}`);
            return NextResponse.json({ message: "Error from Jupiter API", details: errorText }, { status: response.status });
        }

        const { swapTransaction } = await response.json();
        if (!swapTransaction) {
            return NextResponse.json({ message: "Invalid swap transaction response" }, { status: 500 });
        }

        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

        const privateKey = getPrivateKeyFromDB(SolWallet.publicKey);
        transaction.sign([privateKey]);

        const latestBlockHash = await connection.getLatestBlockhash();

        const rawTransaction = transaction.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
            skipPreflight: true,
            maxRetries: 2,
        });

        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: txid,
        });

        console.log(`https://solscan.io/tx/${txid}`);

        return NextResponse.json({ txid }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/swap:", error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }

}

function getPrivateKeyFromDB(privateKey: string) {

    // convert the privateKey which is in string to array of numbers

    const arr = privateKey.split(',').map(x => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keyPair = Keypair.fromSecretKey(privateKeyUintArr);
    return keyPair;
}
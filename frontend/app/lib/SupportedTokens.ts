import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";



export interface TokenDetails {
    symbol: string;
    name: string;
    
}

export const supportedTokens: TokenDetails[] = [
    { symbol: "SOL", name: "Solana" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "USDT", name: "Tether USD" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "BNB", name: "Binance Coin" },
    { symbol: "ADA", name: "Cardano" },
    { symbol: "DOT", name: "Polkadot" },
    { symbol: "LTC", name: "Litecoin" },
    { symbol: "MATIC", name: "Polygon" },
    { symbol: "XRP", name: "Ripple" },
    { symbol: "DAI", name: "Dai" },
    { symbol: "BUSD", name: "Binance USD" },
    { symbol: "SHIB", name: "Shiba Inu" },
    { symbol: "AVAX", name: "Avalanche" },
    { symbol: "LINK", name: "Chainlink" },
    { symbol: "UNI", name: "Uniswap" },
    { symbol: "AAVE", name: "Aave" },
    { symbol: "SUSHI", name: "SushiSwap" },
    { symbol: "COMP", name: "Compound" },
    { symbol: "MKR", name: "Maker" },
    { symbol: "CRV", name: "Curve DAO" },
    { symbol: "ATOM", name: "Cosmos" },
    { symbol: "FTT", name: "FTX Token" },
    { symbol: "1INCH", name: "1inch" },
    { symbol: "ALGO", name: "Algorand" },
    { symbol: "XTZ", name: "Tezos" },
    { symbol: "VET", name: "VeChain" },
    { symbol: "THETA", name: "Theta Network" },
    { symbol: "FIL", name: "Filecoin" },
    { symbol: "EGLD", name: "Elrond" },
    { symbol: "HBAR", name: "Hedera" },
    { symbol: "ICP", name: "Internet Computer" },
    { symbol: "GRT", name: "The Graph" },
    { symbol: "SAND", name: "The Sandbox" },
    { symbol: "MANA", name: "Decentraland" },
    { symbol: "ENJ", name: "Enjin Coin" },
    { symbol: "FTM", name: "Fantom" },
    { symbol: "CELO", name: "Celo" },
    { symbol: "CHAIT", name: "Chai" },
];

export const tokens = async () => {

    const tokenRegistry = await new TokenListProvider().resolve();
    const tokenList = tokenRegistry.getList();
    // Filter tokens based on supported tokens
    const filteredTokens = tokenList.filter((token) =>
        supportedTokens.some((supportedToken) => supportedToken.symbol === token.symbol)
    );
    console.log("filteredTokens", filteredTokens);
    return filteredTokens;
}

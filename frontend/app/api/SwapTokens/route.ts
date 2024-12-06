// import { supportedTokens } from "@/app/lib/SupportedTokens";
// import { TokenListProvider } from "@solana/spl-token-registry";
// import { NextRequest } from "next/server";


// export async function GET(req: NextRequest) {
//     const tokenList = await fetchTokens();
//     return new Response(JSON.stringify(tokenList), { status: 200, headers: { 'Content-Type': 'application/json' } });
// }


// export const fetchTokens = async () => {
//     const tokenRegistry = await new TokenListProvider().resolve();
//     const tokenList = tokenRegistry.getList();
//     // Filter tokens based on supported tokens
//     const filteredTokens = tokenList.filter((token) =>
//         supportedTokens.some((supportedToken) => supportedToken.symbol === token.symbol)
//     );

//     console.log("filteredTokens---->", filteredTokens);
//     return filteredTokens;
// }
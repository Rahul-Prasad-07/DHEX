"use client";

import { useState, useEffect } from "react";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { supportedTokens, TokenDetails,  } from "../../lib/SupportedTokens";

export function Swap() {

    const [baseAsser, setBaseAsset] = useState(supportedTokens[0].symbol);
    const [quoteAsset, setQuoteAsset] = useState(supportedTokens[1].symbol);
    const [tokens, setTokens] = useState<TokenInfo[]>([]);

    useEffect(() => {
        const fetchTokens = async () => {
            const tokenRegistry = await new TokenListProvider().resolve();
            const tokenList = tokenRegistry.getList();
            // Filter tokens based on supported tokens
            const filteredTokens = tokenList.filter((token) =>
                supportedTokens.some((supportedToken) => supportedToken.symbol === token.symbol)
            );
            setTokens(filteredTokens);
        };

        fetchTokens();
    }, []);


    return <div>
        swap page here
        <SwapInputRow onSelect={(assets) => {
            setBaseAsset(assets);
            setQuoteAsset(assets);
        }} selectedToken={quoteAsset} title={"You pay"} />

        <SwapInputRow onSelect={(assets) => {
            setBaseAsset(assets);
            setQuoteAsset(assets);
        }} selectedToken={quoteAsset} title={"You receive"} />
    </div>
}

function SwapInputRow({ onSelect, selectedToken, title }: {
    onSelect: (assets: TokenDetails) => void;
    selectedToken: TokenDetails;
    title: string;
}) {
    return <div className="border flex justify-between p-4">

        <AssetsSelector selectedToken={selectedToken} onSelect={onSelect} />


    </div>
}

function AssetsSelector({ selectedToken, onSelect }: {
    selectedToken: TokenDetails;
    onSelect: (assets: TokenDetails) => void;

}) {
    return <div>
        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            {supportedTokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                    {/* <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="w-6 h-6 inline mr-2"
                    /> */}
                    {token.symbol}
                </option>
            ))}

        </select>

    </div>
}
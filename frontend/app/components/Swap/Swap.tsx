import { useState, useEffect } from "react";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { supportedTokens } from "../../lib/SupportedTokens"; // Adjust the path if needed

export const Swap = () => {
    const [fromToken, setFromToken] = useState("SOL");
    const [toToken, setToToken] = useState("USDC");
    const [amount, setAmount] = useState<number | "">("");
    const [tokens, setTokens] = useState<TokenInfo[]>([]);
    const [fromTokenPrice, setFromTokenPrice] = useState<number | null>(null);
    const [toTokenPrice, setToTokenPrice] = useState<number | null>(null);

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

    useEffect(() => {
        const fetchTokenPrice = async (token: string) => {
            try {
                const response = await fetch(`/api/oracle?amount=1&symbol=${token}&convert=USD`);
                const data = await response.json();
                return data.price || 0; // Assuming the response contains price field
            } catch (error) {
                console.error("Error fetching price:", error);
                return 0;
            }
        };

        if (fromToken) {
            fetchTokenPrice(fromToken).then(setFromTokenPrice);
        }
        if (toToken) {
            fetchTokenPrice(toToken).then(setToTokenPrice);
        }
    }, [fromToken, toToken]);

    const handleSwap = () => {
        console.log(`Swapping ${amount} ${fromToken} to ${toToken}`);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <button className="text-blue-500 mb-4">&larr; Back</button>
            <h3 className="text-2xl font-semibold mb-4">Swap Tokens</h3>

            <div className="flex justify-between items-center mb-4">
                <label className="text-gray-700">You Pay:</label>
                <span className="text-sm text-gray-500">Current Balance: ~0.0639 {fromToken}</span>
                {fromTokenPrice !== null && (
                    <span className="text-sm text-gray-500">Price: ${fromTokenPrice.toFixed(2)}</span>
                )}
            </div>
            <div className="flex items-center border rounded p-4 mb-4">
                <select
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    className="text-lg font-semibold mr-4 focus:outline-none"
                >
                    {tokens.map((token) => (
                        <option key={`${token.address}-${token.symbol}-${Math.random()}`} value={token.symbol}>
                            {/* <img
                                src={token.logoURI}
                                alt={token.symbol}
                                className="w-6 h-6 inline mr-2"
                            /> */}
                            {token.symbol}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : "")}
                    className="w-full text-lg font-semibold text-right focus:outline-none"
                />
                <button className="ml-4 text-blue-500">Max</button>
            </div>

            <div className="flex items-center justify-center mb-4">
                <span className="text-gray-500">⇅</span>
            </div>

            <div className="flex justify-between items-center mb-4">
                <label className="text-gray-700">You Receive:</label>
                <span className="text-sm text-gray-500">Current Balance: 0 {toToken}</span>
                {toTokenPrice !== null && (
                    <span className="text-sm text-gray-500">Price: ${toTokenPrice.toFixed(2)}</span>
                )}
            </div>
            <div className="flex items-center border rounded p-4 mb-4">
                <select
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    className="text-lg font-semibold mr-4 focus:outline-none"
                >
                    {tokens.map((token) => (
                        <option key={token.address} value={token.symbol}>
                            <img
                                src={token.logoURI}
                                alt={token.symbol}
                                className="w-6 h-6 inline mr-2"
                            />
                            {token.symbol}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="0"
                    disabled
                    className="w-full text-lg font-semibold text-right text-gray-400 focus:outline-none"
                />
            </div>

            {/* Additional Options and Actions */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                <button className="underline">View Swap Details</button>
                <button className="underline">Settings</button>
            </div>

            <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
                <button
                    onClick={handleSwap}
                    className="px-6 py-2 bg-blue-500 text-white rounded shadow disabled:opacity-50"
                >
                    Confirm & Swap
                </button>
            </div>
        </div>
    );
};

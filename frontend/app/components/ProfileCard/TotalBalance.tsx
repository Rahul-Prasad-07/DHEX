import { useState, useEffect } from "react";


export function TotalBlance({ publicKey }: { publicKey: string }) {
    const [totalUsdValue, setTotalUsdValue] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchBalanceAndPrices = async () => {
            try {
                //AZ44Fdabhqw48sgeyC71LX2JWoFxkMu7CgmSQ5bqNEWS mainnet-beta yash
                //EDt9dXpmLRVDqngWGnTVgr763DC8ZFyfqUAMttaUBrtK devent rahul
                const response = await fetch(`/api/tokens?publicKey=${"EDt9dXpmLRVDqngWGnTVgr763DC8ZFyfqUAMttaUBrtK"}`);
                if (response.ok) {
                    const data = await response.json();
                    const balances = data.tokenBalances;

                    let totalValue = 0;
                    for (const [mint, token] of Object.entries(balances)) {
                        const usdValue = await fetchTokenUsdValue(token.symbol, token.balance);
                        totalValue += usdValue;
                    }

                    setTotalUsdValue(totalValue);
                } else {
                    console.error("Failed to fetch total balance balance:", await response.text());
                }
            } catch (error) {
                console.error("Error fetching total balance balance:", error);
            }
        };

        fetchBalanceAndPrices();
    }, [publicKey]);

    const fetchTokenUsdValue = async (symbol: string, amount: number) => {
        try {
            const response = await fetch(`/api/oracle?amount=${amount}&symbol=${symbol}&convert=USD`);
            if (response.ok) {
                const data = await response.json();
                return data.convertedPrice;
            }
        } catch (error) {
            console.error(`Error fetching USD value for ${symbol}:`, error);
        }
        return 0;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(publicKey).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };


    return (
        <div className="mt-8">

            total balance page here

            {/* Display Public Key */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-slate-500 mt-4">Account Assets</div>
                <button onClick={handleCopy} className="text-gray-600 text-sm bg-gray-200 px-2 py-1 rounded">
                    {copied ? "Copied!" : "Account Address"}
                </button>
            </div>

            {/* Display Total USD Value */}
            <div className="text-4xl font-semibold">
                {totalUsdValue !== null ? `$${totalUsdValue.toFixed(2)}` : "Loading..."} <span className="text-lg">USD</span>
            </div>

        </div>
    )
}
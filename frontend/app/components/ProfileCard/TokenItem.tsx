
interface TokenBalance {
    balance: number;
    decimals: number;
    name: string;
    symbol: string;
    logoURI: string | null;
    usdValue: number;
}


export function Portfolio({ tokenBalances }: { tokenBalances: { [mint: string]: TokenBalance } }) {
    return (
        <div className="mt-8">

            token page here
            {Object.keys(tokenBalances).length > 0 ? (
                <ul className="space-y-4">
                    {Object.entries(tokenBalances).map(([mint, token]) => (
                        <li key={mint} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-4">
                                {token.logoURI ? (
                                    <img src={token.logoURI} alt={token.name} className="w-10 h-10 rounded-full" />
                                ) : (
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                )}
                                <div>
                                    <div className="text-lg font-medium">{token.name}</div>
                                    <div className="text-sm text-gray-500">{`1 ${token.symbol} ≈ ${(token.usdValue / token.balance).toFixed(2)} USD`}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold">${token.usdValue.toFixed(2)}</div>
                                <div className="text-sm text-gray-500">{token.balance.toFixed(4)} {token.symbol}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="bg-gray-100 p-6 text-center rounded shadow">
                    <p className="text-lg font-semibold">You don't have any assets yet!</p>
                    <p className="text-gray-500 mt-2">Start by buying or depositing funds:</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">+ Add Funds</button>
                </div>
            )}
        </div>
    )
}




// export function Portfolio({ publicKey }: { publicKey: string }) {
//     const [tokenBalances, setTokenBalances] = useState<{ [mint: string]: TokenBalance }>({});

//     useEffect(() => {
//         const fetchBalanceAndPrices = async () => {
//             try {
//                 //AZ44Fdabhqw48sgeyC71LX2JWoFxkMu7CgmSQ5bqNEWS mainnet-beta yash
//                 //EDt9dXpmLRVDqngWGnTVgr763DC8ZFyfqUAMttaUBrtK devent rahul
//                 const response = await fetch(`/api/tokens?publicKey=${"EDt9dXpmLRVDqngWGnTVgr763DC8ZFyfqUAMttaUBrtK"}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     const balances = data.tokenBalances;
//                     const updatedBalances: { [mint: string]: TokenBalance } = {};

//                     for (const [mint, token] of Object.entries(balances)) {
//                         const usdValue = await fetchTokenUsdValue(token.symbol, token.balance);

//                         updatedBalances[mint] = {
//                             ...token,
//                             usdValue,
//                         };
//                     }
//                     setTokenBalances(updatedBalances);
//                 } else {
//                     console.error("Failed to fetch balance:", await response.text());
//                 }
//             } catch (error) {
//                 console.error("Error fetching balance:", error);
//             }
//         };

//         fetchBalanceAndPrices();
//     }, [publicKey]);

//     const fetchTokenUsdValue = async (symbol: string, amount: number) => {
//         try {
//             const response = await fetch(`/api/oracle?amount=${amount}&symbol=${symbol}&convert=USD`);
//             if (response.ok) {
//                 const data = await response.json();
//                 return data.convertedPrice;
//             }
//         } catch (error) {
//             console.error(`Error fetching USD value for ${symbol}:`, error);
//         }
//         return 0;
//     };


//     return (
//         <div className="mt-8">

//             token page here
//             {Object.keys(tokenBalances).length > 0 ? (
//                 <ul className="space-y-4">
//                     {Object.entries(tokenBalances).map(([mint, token]) => (
//                         <li key={mint} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
//                             <div className="flex items-center space-x-4">
//                                 {token.logoURI ? (
//                                     <img src={token.logoURI} alt={token.name} className="w-10 h-10 rounded-full" />
//                                 ) : (
//                                     <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
//                                 )}
//                                 <div>
//                                     <div className="text-lg font-medium">{token.name}</div>
//                                     <div className="text-sm text-gray-500">{`1 ${token.symbol} ≈ ${(token.usdValue / token.balance).toFixed(2)} USD`}</div>
//                                 </div>
//                             </div>
//                             <div className="text-right">
//                                 <div className="text-lg font-semibold">${token.usdValue.toFixed(2)}</div>
//                                 <div className="text-sm text-gray-500">{token.balance.toFixed(4)} {token.symbol}</div>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <div className="bg-gray-100 p-6 text-center rounded shadow">
//                     <p className="text-lg font-semibold">You don't have any assets yet!</p>
//                     <p className="text-gray-500 mt-2">Start by buying or depositing funds:</p>
//                     <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">+ Add Funds</button>
//                 </div>
//             )}
//         </div>
//     )
// }
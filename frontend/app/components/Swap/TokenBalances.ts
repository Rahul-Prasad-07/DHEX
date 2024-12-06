import { useState, useEffect } from "react";

interface TokenBalance {
    balance: number;
    decimals: number;
    name: string;
    symbol: string;
    logoURI: string | null;
    usdValue: number;
}

export const TokenBalances = async ({ publicKey, symbol }: { publicKey: string, symbol: string }) => {
    try {
        const response = await fetch(`/api/tokens?publicKey=${publicKey}`);
        if (response.ok) {
            const data = await response.json();
            const balances = data.tokenBalances;
            const updatedBalances: { [mint: string]: TokenBalance } = {};

            for (const [mint, token] of Object.entries(balances)) {
                const usdValue = await fetchTokenUsdValue(token.symbol, token.balance);

                updatedBalances[mint] = {
                    ...token,
                    usdValue,
                };
            }

            // Filter the balances by the given symbol
            const filteredBalances = Object.values(updatedBalances).filter(token => token.symbol === symbol);
            return filteredBalances;
        } else {
            console.error("Failed to fetch balance:", await response.text());
        }
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
    return [];
}

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
"use client";

import React, { useState, useEffect } from "react";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { supportedTokens, TokenDetails, tokens } from "../../lib/SupportedTokens";
import { PrimaryButton } from "../Button";
import axios from "axios";


export function Swap({ publicKey, tokenBalances }: { publicKey: string, tokenBalances: TokenDetails[] }) {
    const [baseAsset, setBaseAsset] = useState(supportedTokens[0]);
    const [quoteAsset, setQuoteAsset] = useState(supportedTokens[1]);
    const [tokens, setTokens] = useState<TokenInfo[]>([]);
    const [baseAmount, setBaseAmount] = useState<string>();
    const [quoteAmount, setQuoteAmount] = useState<string>();
    const [fetchingQuote, setFetchingQuote] = useState(false);
    const [quoteResponse, setQuoteResponse] = useState<any>();


    useEffect(() => {
        const fetchData = async () => {


            try {
                // const response = await fetch(`/api/oracle?amount=${baseAmount}&symbol=${baseAsset.symbol}&convert=${quoteAsset.symbol}`);
                // const data = await response.json();
                // console.log("response---->", data.convertedPrice);
                // setQuoteAmount(data.convertedPrice);

                // console.log("baseAsset", baseAsset);  

                if (!baseAmount || !baseAsset || !quoteAsset) return;


                const baseToken = tokens.find((token) => token.symbol === baseAsset.symbol);
                const quoteToken = tokens.find((token) => token.symbol === quoteAsset.symbol);
                const amountInBaseUnits = Number(baseAmount) * (10 ** baseToken?.decimals);

                setFetchingQuote(true);
                const url = `https://quote-api.jup.ag/v6/quote?inputMint=${baseToken?.address}&outputMint=${quoteToken.address}&amount=${amountInBaseUnits}&slippageBps=50`;
                axios.get(url)
                    .then(res => {
                        console.log("res", res.data);
                        setQuoteAmount((Number(res.data.outAmount) / (Number(10 ** quoteToken?.decimals))).toString());
                        setFetchingQuote(false);
                        setQuoteResponse(res.data);
                    })
            } catch (error) {
                console.error("Error fetching price:", error);
            }

        };

        fetchData();
    }, [baseAmount, baseAsset, quoteAsset]);


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



    return (
        <div>

            <div className="text-xl font-bold pb-4 pt-6">
                Swap Tokens
            </div>

            {/* {JSON.stringify(baseAsset)} */}

            <SwapInputRow
                onSelect={(assets) => {
                    setBaseAsset(assets);
                }}
                amount={baseAmount}
                onAmountChange={(value: string) => {
                    setBaseAmount(value);
                }}
                selectedToken={baseAsset}
                title={"You pay:"}
                subtitle={
                    <div className="text-slate-500 text-sm pl-1 pt-1 flex">

                        <div className="font-normal pr-1"> Current Balance: </div>
                        <div className="font-semibold">{tokenBalances.find((token) => token.symbol === baseAsset.symbol)?.balance || 0} {baseAsset.symbol}</div>

                    </div>}
                tokens={tokens}

                topBorderEnable={true} bottomBorderEnable={false}

            />


            <div className="flex justify-center">
                <div onClick={() => {
                    const baseAssetTemp = baseAsset;
                    setBaseAsset(quoteAsset);
                    setQuoteAsset(baseAssetTemp);
                }} className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px] bg-white flex justify-center pt-2 ">
                    <SwapIcon />
                </div>

            </div>

            <SwapInputRow
                onSelect={(assets) => {

                    setQuoteAsset(assets);
                }}
                inputDisabled={true}
                inputLoading={fetchingQuote}
                amount={quoteAmount}
                // onAmountChange={(value:string)=>{
                //     setQuoteAmount(value);
                // }}
                selectedToken={quoteAsset}
                title={"You receive: "}
                subtitle={
                    <div className="text-slate-500 text-sm pl-1 pt-1 flex">

                        <div className="font-normal pr-1"> Current Balance: </div>
                        <div className="font-semibold">{tokenBalances.find((token) => token.symbol === quoteAsset.symbol)?.balance || 0} {quoteAsset.symbol}</div>

                    </div>}
                tokens={tokens}

                topBorderEnable={false} bottomBorderEnable={true}

            />

            <div className="flex justify-end pt-4">
                <PrimaryButton onClick={() => {
                    axios.post("api/swap", {
                        quoteResponse
                    })
                }}>Swap</PrimaryButton>
            </div>
        </div>
    );
}

function SwapIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>


    );
}
function Loader() {
    return (
        <div className="loader"></div>
    );
}

function SwapInputRow({ onSelect, inputDisabled, inputLoading, selectedToken, amount, onAmountChange, title, subtitle, tokens, topBorderEnable, bottomBorderEnable }: {
    onSelect: (assets: TokenDetails) => void;
    selectedToken: TokenDetails;
    title: string;
    subtitle?: React.ReactNode;
    tokens: TokenInfo[];
    amount?: string;
    topBorderEnable: boolean;
    bottomBorderEnable: boolean;
    onAmountChange?: (value: string) => void;
    inputDisabled?: boolean;
    inputLoading?: boolean;

}) {
    return (
        <div className={`border flex justify-between p-6 ${topBorderEnable ? "rounded-t-xl" : ""} ${bottomBorderEnable ? "rounded-b-xl" : ""} `}>
            <div>
                <div className="text-sm font-semibold mb-1">
                    {title}
                </div>
                <AssetsSelector selectedToken={selectedToken} onSelect={onSelect} tokens={tokens} subtitle={subtitle} />

                <div className="mt-2">
                    {subtitle}
                </div>

            </div>

            <div>
                {/* <input disabled={inputDisabled} onChange={(e) => {
                    onAmountChange?.(e.target.value);
                }} type="text" placeholder="0" className="p-6   bg-slate-50 outline-none text-3xl text-right" dir="rtl" value={inputLoading ? "Loading" : amount}></input> */}


                {inputLoading ? (
                    <div className="flex items-center justify-center h-full p-6 ">
                        <Loader />
                    </div>
                ) : (
                    <input
                        disabled={inputDisabled}
                        onChange={(e) => onAmountChange?.(e.target.value)}
                        type="text"
                        placeholder="0"
                        className="p-6 bg-slate-50 outline-none text-3xl text-right"
                        dir="rtl"
                        value={amount}
                    />
                )}
            </div>
        </div>


    );
}


function AssetsSelector({ selectedToken, onSelect, tokens }: {
    selectedToken: TokenDetails;
    onSelect: (assets: TokenDetails) => void;
    tokens: TokenInfo[];
}) {
    return (
        <div className="w-24">
            {/* {JSON.stringify(selectedToken)} */}
            <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={selectedToken.symbol}
                onChange={(e) => {
                    const selectedToken = tokens.find(token => token.symbol === e.target.value);
                    if (selectedToken) {
                        onSelect(selectedToken);
                    }


                }}
            >
                {tokens.map((token) => (
                    <option selected={selectedToken.name == token.name}>
                        <img
                            src={token.logoURI || ""}
                            alt={token.symbol}
                            className="w-6 h-6 inline mr-2"
                        />
                        {token.symbol}
                    </option>
                ))}
            </select>
        </div>
    );
}
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const COINMARKETCAP_API = process.env.COINMARKETCAP_API!;
const REDIS_HOST = process.env.REDIS_HOST!;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD!;
const BASE_URL = process.env.BASE_URL!;
const REDIS_PORT = Number(process.env.REDIS_PORT);

let redisClient: ReturnType<typeof createClient>;
let api;
let apipc: ReturnType<typeof axios.create>;

// Initialize Redis and Axios instances
const initialize = async () => {
    try {
        redisClient = createClient({
            password: REDIS_PASSWORD,
            socket: {
                host: REDIS_HOST,
                port: REDIS_PORT,
            },
        });

        redisClient.on('error', (err) => console.error('Redis error:', err));
        await redisClient.connect();
        console.log('Redis connected');

        api = axios.create({
            baseURL: BASE_URL,
            headers: {
                'X-CMC_PRO_API_KEY': COINMARKETCAP_API,
                Accept: 'application/json',
            },
        });

        apipc = axios.create({
            baseURL: 'https://pro-api.coinmarketcap.com/v2/tools',
            headers: {
                'X-CMC_PRO_API_KEY': COINMARKETCAP_API,
                Accept: 'application/json',
            },
        });
    } catch (error) {
        console.error('Initialization error:', error.message);
    }
};

// Ensure initialization is called at least once
initialize();

const getCacheKey = (amount: string, symbol: string, convert: string) => {
    const baseCurrency = symbol === 'INRC' ? 'INR' : symbol;
    const targetCurrency = convert === 'INRC' ? 'INR' : convert;
    return `${amount}-${baseCurrency}-to-${targetCurrency}`;
};

const inrcUsdt = async (amount: string, symbol: string, convert: string) => {
    try {

        symbol = symbol === "INRC" ? "INR" : symbol;
        convert = convert === "INRC" ? "INR" : convert;
        const amountFloat = parseFloat(amount);

        if (amountFloat <= 0.0000000001) {
            return { convertedPrice: 0 };
        } else {
            const allowedSymbols = ["INR", "INRC"];
            const allowedConverts = ["USDT", "USD", "USDC"];

            if (allowedSymbols.includes(symbol) && allowedConverts.includes(convert)) {
                const intermediaryCurrencies = ["USDC", "USD", "USDT"];

                if (intermediaryCurrencies.includes(convert)) {
                    [symbol, convert] = [convert, symbol];
                }

                const response = await apipc.get("/price-conversion", {
                    params: { amount, symbol, convert },
                });

                if (response.status === 200) {
                    const conversionRate = response.data.data[0].quote[convert].price;
                    console.log("conversionRate", conversionRate);
                    console.log("amount", amount);


                    // Calculate the converted amount
                    const convertedAmount = amount / conversionRate;
                    console.log("convertedAmount", convertedAmount);

                    // final conversion rate
                    const finalConversionRate = convertedAmount * amount;

                    return { convertedPrice: finalConversionRate };
                } else {
                    throw new Error('Failed to fetch conversion rates from inrusdt function');
                }
            } else {
                throw new Error("Invalid 'symbol' or 'convert' values. Allowed values are 'INR', 'INRC' for 'symbol' and 'USDT', 'USD', 'USDC' for 'convert'.");
            }
        }
    } catch (error) {
        console.error('inrcUsdt error:', error);
        throw error;
    }
};

// Next.js API route handler
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount');
    const symbol = searchParams.get('symbol');
    const convert = searchParams.get('convert');

    if (!amount || !symbol || !convert) {
        return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
    }

    if (symbol === 'UNKNOWN') {
        return NextResponse.json({ error: "Invalid symbol: 'UNKNOWN' is not a valid currency symbol." }, { status: 400 });
    }

    try {
        const cacheKey = getCacheKey(amount!, symbol!, convert!);
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return NextResponse.json(JSON.parse(cachedData));
        }

        const result = await priceConvert(parseFloat(amount!), symbol!, convert!);
        await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 * 5 }); // Cache for 5 minutes

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

const fixedAssetPrices = {
    CHAIT: 0.003,  // CHAIT price in USD
    RAHUL: 1.25,  // Add more fixed assets here as needed
    SUCHIT: 0.25,
    UNKNOWN: 5,
};

// Handle fixed asset conversion
const convertFixedAsset = async (amount: any, symbol: string, convert: string) => {
    const fromPriceUSD = fixedAssetPrices[symbol];
    const toPriceUSD = fixedAssetPrices[convert];

    console.log("fromPriceUSD", fromPriceUSD);
    console.log("toPriceUSD", toPriceUSD);

    if (symbol === convert) return amount; // Same asset, no conversion

    if (fromPriceUSD && toPriceUSD) {
        // Convert from one fixed asset to another using USD as an intermediary
        const amountInUSD = amount * fromPriceUSD;
        return amountInUSD / toPriceUSD;
    } else if (fromPriceUSD) {
        // Convert from fixed asset to other asset via USD
        const amountInUSD = amount * fromPriceUSD;
        console.log("amountInUSD if fromPriceUSD", amountInUSD);
        const response = await apipc.get('/price-conversion', {
            params: { amount: amountInUSD, symbol: 'USD', convert },
        });
        console.log("response.data.data[0].quote[convert].price", response.data.data[0].quote[convert].price);
        return response.data.data[0].quote[convert].price;
    } else if (toPriceUSD) {
        // Convert from other asset to fixed asset via USD
        const response = await apipc.get('/price-conversion', {
            params: { amount, symbol, convert: 'USD' },
        });
        const amountInUSD = response.data.data[0].quote['USD'].price;
        console.log("amountInUSD if toPriceUSD", amountInUSD);
        return amountInUSD / toPriceUSD;
    } else {
        throw new Error("Both assets must be either fixed or a valid asset symbol.");
    }
};



// Price conversion function
const priceConvert = async (amount: any, symbol: string, convert: string) => {
    // const chaitPrice = 0.003;

    // if (symbol === 'CHAIT' && convert === 'CHAIT') {
    //     return { convertedPrice: amount };
    // }

    // if (symbol === 'CHAIT' || convert === 'CHAIT') {
    //     const convertedPrice = symbol === 'CHAIT'
    //         ? amount * chaitPrice
    //         : amount / chaitPrice;
    //     return { convertedPrice };
    // }

    if (['INR', 'INRC'].includes(symbol) && ['INR', 'INRC'].includes(convert)) {
        return { convertedPrice: amount };
    }

    const restrictedCombinations = [
        { symbol: 'INR', convert: 'USD' },
        { symbol: 'INRC', convert: 'USD' },
        { symbol: 'INR', convert: 'USDC' },
        { symbol: 'INRC', convert: 'USDC' },
        { symbol: 'INR', convert: 'USDT' },
        { symbol: 'INRC', convert: 'USDT' },
    ];

    const isRestricted = restrictedCombinations.some(
        ({ symbol: restrictSymbol, convert: restrictConvert }) =>
            symbol === restrictSymbol && convert === restrictConvert
    );

    if (isRestricted) {
        console.log("calling inrcUsdt____________________");
        console.log("amount", amount);
        console.log("symbol", symbol);
        console.log("convert", convert);
        return await inrcUsdt(amount, symbol, convert);
    } else {
        try {
            symbol = symbol === "INRC" ? "INR" : symbol;
            convert = convert === "INRC" ? "INR" : convert;
            const amountFloat = parseFloat(amount);

            if (amountFloat <= 0.0000000001) {
                return { convertedPrice: 0 };
            } else {

                if (fixedAssetPrices[symbol] || fixedAssetPrices[convert]) {
                    try {
                        const convertedPrice = await convertFixedAsset(amount, symbol, convert);
                        console.log(`${symbol} price in ${convert}: ${convertedPrice}`)
                        return { convertedPrice };
                    } catch (error) {
                        console.log("Error converting fixed asset:", error.message);
                        throw new Error("An error occurred while converting fixed asset");
                    }
                }

                const response = await apipc.get("/price-conversion", {
                    params: { amount, symbol, convert },
                });

                if (response.status === 200) {
                    const convertedPrice = response.data.data[0].quote[convert].price;
                    const roundedValue = Math.ceil(convertedPrice * 1000) / 1000;

                    return { convertedPrice: roundedValue };
                } else {
                    throw new Error('Failed to fetch conversion rates');
                }
            }
        } catch (error) {
            console.error('Price conversion error:', error);
            throw error;
        }
    }
};

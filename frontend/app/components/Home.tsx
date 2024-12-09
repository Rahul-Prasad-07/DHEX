"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Home = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleClick = () => {
        if (status === "authenticated") {
            router.push("/dashboard");
        } else {
            signIn("google", { prompt: "select_account" });
        }
    };

    return (
        <div className="flex flex-col space-y-16">
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-r from-green-100 to-green-50 shadow-lg">
                <div className="flex flex-col justify-center items-start space-y-4">
                    <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
                        DHex Hedging Crypto{" "}
                        <span className="text-green-500">Volatility</span>
                    </h1>
                    <p className="text-xl text-gray-700">
                        Take control of your crypto investments and protect against market
                        fluctuations. Powered by innovative hedging algorithms.
                    </p>
                    <button
                        onClick={handleClick}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
                    >
                        {status === "authenticated" ? "Go to Dashboard" : "Login with Google"}
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <img
                        src="https://www.chaidex.com/assets/images/unlock-value/unlock-value-light.svg"
                        alt="hero"
                        className="w-96 h-96 transform hover:scale-110 transition duration-300 shadow-xl"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <StatsSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* Roadmap Section */}
            <RoadmapSection />

            {/* Supported Chains Section */}
            <SupportedChainsSection />

            {/* Trusted By Section */}
            <TrustedBySection />

            {/* FAQs Section */}
            <FAQSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Call to Action Section */}
            <CTASection onClick={handleClick} isAuthenticated={status === "authenticated"} />
        </div>
    );
};

// Stats Section
function StatsSection() {
    return (
        <div className="bg-white py-10 shadow-sm border-b">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                    <div className="text-5xl font-bold text-green-600">10k+</div>
                    <p className="text-gray-500">Users Hedging Daily</p>
                </div>
                <div>
                    <div className="text-5xl font-bold text-green-600">50+</div>
                    <p className="text-gray-500">Supported Crypto Assets</p>
                </div>
                <div>
                    <div className="text-5xl font-bold text-green-600">99.9%</div>
                    <p className="text-gray-500">Uptime & Reliability</p>
                </div>
            </div>
        </div>
    );
}

// Features Section
function FeaturesSection() {
    const features = [
        {
            title: "Automated Hedging",
            description:
                "Set up automated strategies to hedge against market swings and secure your investments.",
            icon: "🤖",
        },
        {
            title: "Transparent Pricing",
            description:
                "No hidden fees. Only pay for what you use with clear, upfront pricing.",
            icon: "💸",
        },
        {
            title: "Secure & Trusted",
            description:
                "Your assets are protected with industry-leading security measures and insured custody.",
            icon: "🔒",
        },
        {
            title: "Real-time Insights",
            description:
                "Gain actionable insights with live analytics to optimize your crypto hedging strategies.",
            icon: "📊",
        },
    ];

    return (
        <div className="py-16 bg-gray-50">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
                Why Choose DHex?
            </h2>
            <div className="max-w-5xl mx-auto px-4 grid gap-10 md:grid-cols-2">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="text-5xl">{feature.icon}</div>
                        <div>
                            <h3 className="font-bold text-xl text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Roadmap Section
function RoadmapSection() {
    const roadmap = [
        { quarter: "Q1 2025", milestone: "Launch of Core Platform" },
        { quarter: "Q2 2025", milestone: "Integration with Major Exchanges" },
        { quarter: "Q3 2025", milestone: "Mobile App Release" },
        { quarter: "Q4 2025", milestone: "AI-powered Insights" },
    ];

    return (
        <div className="py-16 bg-white">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
                Our Roadmap
            </h2>
            <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
                {roadmap.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition duration-200"
                    >
                        <h3 className="text-xl font-bold text-gray-800">{item.quarter}</h3>
                        <p className="text-gray-600 mt-2">{item.milestone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Supported Chains Section
function SupportedChainsSection() {
    const chains = [
        { name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
        { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.png" },
        { name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.png" },
        { name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png" },
        { name: "Arbitrum", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png" },
        { name: "Tron", logo: "https://cryptologos.cc/logos/tron-trx-logo.png" },
        { name: "BNB Chain", logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" },
        { name: "Cardano", logo: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
    ];

    return (
        <div className="py-16 bg-white">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
                Supported Chains
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {chains.map((chain, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg shadow hover:shadow-xl transition duration-300"
                    >
                        <img src={chain.logo} alt={chain.name} className="h-16 w-16" />
                        <p className="text-lg font-semibold text-gray-800">{chain.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Trusted By Section
function TrustedBySection() {
    const companies = [
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/solana-sol-logo.png",
        "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    ];

    return (
        <div className="py-16 bg-gray-50">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
                Trusted By Leading Crypto Foundations
            </h2>
            <div className="flex justify-center items-center space-x-8">
                {companies.map((logo, idx) => (
                    <img
                        key={idx}
                        src={logo}
                        alt={`Company ${idx}`}
                        className="h-16 w-16 rounded-lg hover:scale-125 transition-transform duration-300"
                    />
                ))}
            </div>
        </div>
    );
}

// FAQs Section
function FAQSection() {
    const faqs = [
        {
            question: "What is DHex?",
            answer: "DHex is a platform that helps hedge crypto volatility.",
        },
        {
            question: "How does hedging work?",
            answer:
                "Hedging reduces financial risk by offsetting potential losses through balanced strategies.",
        },
        {
            question: "Is my data secure?",
            answer: "Yes, DHex prioritizes user privacy and asset security.",
        },
    ];

    return (
        <div className="py-16 bg-white">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
                Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow">
                        <h3 className="font-bold text-gray-800">{faq.question}</h3>
                        <p className="text-gray-600 mt-2">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Testimonials Section
function TestimonialsSection() {
    const testimonials = [
        { name: "Alice", content: "DHex helped me navigate the crypto market!" },
        { name: "Mark", content: "Their strategies reduced my losses significantly!" },
        { name: "Sophia", content: "Real-time insights made all the difference." },
    ];

    return (
        <div className="py-16 bg-gray-50 border-t border-b">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
                What Our Users Say
            </h2>
            <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3">
                {testimonials.map((t, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-xl">
                        <p className="text-gray-600 italic">“{t.content}”</p>
                        <h3 className="text-lg font-bold mt-4">{t.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Call to Action Section
function CTASection({ onClick, isAuthenticated }: { onClick: () => void; isAuthenticated: boolean }) {
    return (
        <div className="py-16 bg-gradient-to-bl from-green-50 to-green-100 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Ready to Get Started?
            </h2>
            <button
                onClick={onClick}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
                {isAuthenticated ? "Visit Your Dashboard" : "Sign In with Google"}
            </button>
        </div>
    );
}

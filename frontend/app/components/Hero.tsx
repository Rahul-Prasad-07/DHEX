// 'use client';
// import { signIn, useSession } from "next-auth/react";
// import { SecondaryButton } from "./Button";
// import { useRouter } from "next/navigation";

// export const Hero = () => {
//     // const session = useSession();
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     const handleClick = () => {
//         if (status === "authenticated") {
//             router.push("/dashboard");
//         } else {
//             signIn("google", { prompt: "select_account" });
//         }
//     }
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-re border">
//             <div className="flex flex-col justify-center items-start space-y-4">
//                 <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">DHex Hedging Crypto <span className="text-green-500">Volatility </span></h1>
//                 <p className="text-xl drop-shadow-md">Hedge your crypto volatility with Dhex</p>
//                 {/* <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
//                     Get Started
//                 </button> */}

//                 {/* {session.data?.user ? <SecondaryButton onClick={() => {
//                     router.push("/dashboard");
//                 }}> Go to Dashboard </SecondaryButton> : <SecondaryButton onClick={() => {
//                     signIn("google", { prompt: "select_account" });
//                 }}> Login with google </SecondaryButton>} */}

//                 <SecondaryButton onClick={handleClick}>
//                     {status === "authenticated" ? "Go to Dashboard" : "Login with Google"}
//                 </SecondaryButton>


//             </div>
//             <div className="flex justify-center items-center p-1">
//                 <img src="https://www.chaidex.com/assets/images/unlock-value/unlock-value-light.svg" alt="hero" className="w-96 h-96 transform hover:scale-110 transition duration-300 shadow-1xl" />
//             </div>
//         </div>
//     );
// }



// "use client";

// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// export const Hero = () => {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     const handleClick = () => {
//         if (status === "authenticated") {
//             router.push("/dashboard");
//         } else {
//             signIn("google", { prompt: "select_account" });
//         }
//     };

//     return (
//         <div className="flex flex-col space-y-16">
//             {/* Hero Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-re border">
//                 {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-tr from-gray-50 to-gray-100 border-b shadow-sm"> */}
//                 <div className="flex flex-col justify-center items-start space-y-4">
//                     <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg text-gray-900">
//                         DHex Hedging Crypto{" "}
//                         <span className="text-green-500">Volatility</span>
//                     </h1>
//                     <p className="text-xl drop-shadow-md text-gray-700">
//                         Hedge your crypto volatility with Dhex and stay ahead in the ever-changing market.
//                     </p>
//                     <button
//                         onClick={handleClick}
//                         className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
//                     >
//                         {status === "authenticated" ? "Go to Dashboard" : "Login with Google"}
//                     </button>
//                 </div>
//                 {/* <div className="flex justify-center items-center p-1">
//                     <Image
//                         src="https://www.chaidex.com/assets/images/unlock-value/unlock-value-light.svg"
//                         alt="hero"
//                         width={300}
//                         height={300}
//                         className="transform hover:scale-110 transition duration-300 shadow-xl"
//                     />
//                 </div> */}

//                 <div className="flex justify-center items-center p-1">
//                     <img src="https://www.chaidex.com/assets/images/unlock-value/unlock-value-light.svg" alt="hero" className="w-96 h-96 transform hover:scale-110 transition duration-300 shadow-1xl" />
//                 </div>
//             </div>

//             {/* Stats Section */}
//             <StatsSection />

//             {/* Features Section */}
//             <FeaturesSection />

//             {/* Testimonials */}
//             <TestimonialsSection />

//             {/* Call to Action */}
//             <CTASection onClick={handleClick} isAuthenticated={status === "authenticated"} />
//         </div>
//     );
// };

// // Stats Section
// function StatsSection() {
//     return (
//         <div className="bg-white py-10 shadow-sm border-b">
//             <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//                 <div>
//                     <div className="text-4xl font-bold text-green-600">10k+</div>
//                     <p className="text-gray-500">Users Hedging Daily</p>
//                 </div>
//                 <div>
//                     <div className="text-4xl font-bold text-green-600">50+</div>
//                     <p className="text-gray-500">Supported Crypto Assets</p>
//                 </div>
//                 <div>
//                     <div className="text-4xl font-bold text-green-600">99.9%</div>
//                     <p className="text-gray-500">Uptime & Reliability</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // Features Section
// function FeaturesSection() {
//     const features = [
//         {
//             title: "Automated Hedging",
//             description:
//                 "Set up automated strategies to hedge against market swings, ensuring you’re always protected.",
//             icon: "🌐",
//         },
//         {
//             title: "Transparent Pricing",
//             description:
//                 "No hidden fees. You pay only for the services you use with clear upfront pricing.",
//             icon: "💎",
//         },
//         {
//             title: "Secure & Trusted",
//             description:
//                 "Your assets are safe with industry-leading security measures and insured custody.",
//             icon: "🔒",
//         },
//         {
//             title: "Real-time Insights",
//             description:
//                 "Get real-time analytics and personalized recommendations to optimize your hedging strategy.",
//             icon: "📈",
//         },
//     ];

//     return (
//         <div className="py-16 bg-gray-50">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
//                 Why Choose DHex?
//             </h2>
//             <div className="max-w-5xl mx-auto px-4 grid gap-10 md:grid-cols-2">
//                 {features.map((feature, idx) => (
//                     <div
//                         key={idx}
//                         className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
//                     >
//                         <div className="text-4xl">{feature.icon}</div>
//                         <div>
//                             <h3 className="font-bold text-xl text-gray-800">
//                                 {feature.title}
//                             </h3>
//                             <p className="text-gray-600 mt-2">{feature.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// // Testimonials Section
// function TestimonialsSection() {
//     const testimonials = [
//         {
//             name: "Alice",
//             content:
//                 "DHex helped me navigate the crypto market smoothly. I’ve never felt more secure about my investments!",
//             image: "https://via.placeholder.com/50",
//         },
//         {
//             name: "Mark",
//             content:
//                 "Their automated hedging strategies are top-notch. I’ve reduced my losses significantly!",
//             image: "https://via.placeholder.com/50",
//         },
//         {
//             name: "Sophia",
//             content:
//                 "Real-time insights are a game-changer. I can quickly adapt my strategies with just a few clicks.",
//             image: "https://via.placeholder.com/50",
//         },
//     ];

//     return (
//         <div className="py-16 bg-white border-t border-b">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
//                 What Our Users Say
//             </h2>
//             <div className="max-w-5xl mx-auto px-4 grid gap-10 md:grid-cols-3">
//                 {testimonials.map((t, idx) => (
//                     <div
//                         key={idx}
//                         className="bg-gray-50 p-6 rounded-lg shadow flex flex-col space-y-4"
//                     >
//                         <div className="flex items-center space-x-4">
//                             <img
//                                 src={t.image}
//                                 alt={t.name}
//                                 className="w-12 h-12 rounded-full"
//                             />
//                             <div className="font-semibold text-gray-800">{t.name}</div>
//                         </div>
//                         <p className="text-gray-600 italic">“{t.content}”</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// // Call to Action
// function CTASection({ onClick, isAuthenticated }: { onClick: () => void; isAuthenticated: boolean; }) {
//     return (
//         <div className="py-16 bg-gradient-to-bl from-green-50 to-green-100 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
//                 Ready to Get Started?
//             </h2>
//             <p className="text-gray-700 mb-8">
//                 Whether you’re new to crypto or a seasoned investor, DHex has the tools
//                 you need.
//             </p>
//             <button
//                 onClick={onClick}
//                 className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 font-bold"
//             >
//                 {isAuthenticated ? "Visit Your Dashboard" : "Sign In with Google"}
//             </button>
//         </div>
//     );
// }


// "use client";

// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// export const Hero = () => {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     const handleClick = () => {
//         if (status === "authenticated") {
//             router.push("/dashboard");
//         } else {
//             signIn("google", { prompt: "select_account" });
//         }
//     };

//     return (
//         <div className="flex flex-col space-y-16">
//             {/* Hero Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-re border">
//                 <div className="flex flex-col justify-center items-start space-y-4">
//                     <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg text-gray-900">
//                         DHex Hedging Crypto{" "}
//                         <span className="text-green-500">Volatility</span>
//                     </h1>
//                     <p className="text-xl drop-shadow-md text-gray-700">
//                         Hedge your crypto volatility with Dhex and stay ahead in the ever-changing market.
//                     </p>
//                     <button
//                         onClick={handleClick}
//                         className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
//                     >
//                         {status === "authenticated" ? "Go to Dashboard" : "Login with Google"}
//                     </button>
//                 </div>
//                 <div className="flex justify-center items-center p-1">
//                     <img
//                         src="https://www.chaidex.com/assets/images/unlock-value/unlock-value-light.svg"
//                         alt="hero"
//                         className="w-96 h-96 transform hover:scale-110 transition duration-300 shadow-1xl"
//                     />
//                 </div>
//             </div>

//             {/* Stats Section */}
//             <StatsSection />

//             {/* Features Section */}
//             <FeaturesSection />

//             {/* Roadmap Section */}
//             <RoadmapSection />

//             {/* Trusted By Section */}
//             <TrustedBySection />

//             {/* FAQs Section */}
//             <FAQSection />

//             {/* Testimonials */}
//             <TestimonialsSection />

//             {/* Call to Action */}
//             <CTASection onClick={handleClick} isAuthenticated={status === "authenticated"} />
//         </div>
//     );
// };

// // Stats Section
// function StatsSection() {
//     return (
//         <div className="bg-white py-10 shadow-sm border-b">
//             <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//                 <div>
//                     <div className="text-4xl font-bold text-green-600">10k+</div>
//                     <p className="text-gray-500">Users Hedging Daily</p>
//                 </div>
//                 <div>
//                     <div className="text-4xl font-bold text-green-600">50+</div>
//                     <p className="text-gray-500">Supported Crypto Assets</p>
//                 </div>
//                 <div>
//                     <div className="text-4xl font-bold text-green-600">99.9%</div>
//                     <p className="text-gray-500">Uptime & Reliability</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // Features Section
// function FeaturesSection() {
//     const features = [
//         {
//             title: "Automated Hedging",
//             description: "Set up automated strategies to hedge against market swings.",
//             icon: "🌐",
//         },
//         {
//             title: "Transparent Pricing",
//             description: "No hidden fees. You pay only for what you use.",
//             icon: "💎",
//         },
//         {
//             title: "Secure & Trusted",
//             description: "Your assets are safe with industry-leading security measures.",
//             icon: "🔒",
//         },
//         {
//             title: "Real-time Insights",
//             description: "Get personalized recommendations for optimal hedging.",
//             icon: "📈",
//         },
//     ];

//     return (
//         <div className="py-16 bg-gray-50">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
//                 Why Choose DHex?
//             </h2>
//             <div className="max-w-5xl mx-auto px-4 grid gap-10 md:grid-cols-2">
//                 {features.map((feature, idx) => (
//                     <div
//                         key={idx}
//                         className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
//                     >
//                         <div className="text-4xl">{feature.icon}</div>
//                         <div>
//                             <h3 className="font-bold text-xl text-gray-800">{feature.title}</h3>
//                             <p className="text-gray-600 mt-2">{feature.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// // Roadmap Section
// function RoadmapSection() {
//     const roadmap = [
//         { quarter: "Q1 2025", milestone: "Launch of Core Platform" },
//         { quarter: "Q2 2025", milestone: "Integration with Major Exchanges" },
//         { quarter: "Q3 2025", milestone: "Mobile App Release" },
//         { quarter: "Q4 2025", milestone: "AI-powered Insights" },
//     ];

//     return (
//         <div className="py-16 bg-white">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
//                 Our Roadmap
//             </h2>
//             <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
//                 {roadmap.map((item, idx) => (
//                     <div key={idx} className="p-6 bg-gray-50 rounded-lg shadow">
//                         <h3 className="text-xl font-bold text-gray-800">{item.quarter}</h3>
//                         <p className="text-gray-600 mt-2">{item.milestone}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// // Trusted By Section
// function TrustedBySection() {
//     const companies = [
//         "https://via.placeholder.com/100",
//         "https://via.placeholder.com/100",
//         "https://via.placeholder.com/100",
//         "https://via.placeholder.com/100",
//     ];

//     return (
//         <div className="py-16 bg-gray-50">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
//                 Trusted By
//             </h2>
//             <div className="flex justify-center space-x-8">
//                 {companies.map((logo, idx) => (
//                     <img key={idx} src={logo} alt={`Company ${idx}`} className="h-12" />
//                 ))}
//             </div>
//         </div>
//     );
// }

// // FAQs Section
// function FAQSection() {
//     const faqs = [
//         { question: "What is DHex?", answer: "DHex is a platform for hedging crypto volatility." },
//         { question: "How does hedging work?", answer: "We use algorithms to mitigate market risks." },
//         { question: "Is my data secure?", answer: "Yes, we prioritize user privacy and security." },
//     ];

//     return (
//         <div className="py-16 bg-white border-t">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
//                 Frequently Asked Questions
//             </h2>
//             <div className="max-w-3xl mx-auto space-y-6">
//                 {faqs.map((faq, idx) => (
//                     <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow">
//                         <h3 className="font-bold text-gray-800">{faq.question}</h3>
//                         <p className="text-gray-600 mt-2">{faq.answer}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// // Testimonials Section
// function TestimonialsSection() {
//     const testimonials = [
//         { name: "Alice", content: "DHex helped me navigate the crypto market smoothly." },
//         { name: "Mark", content: "Their automated strategies are top-notch!" },
//         { name: "Sophia", content: "Real-time insights are a game-changer." },
//     ];

//     return (
//         <div className="py-16 bg-white border-t border-b">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
//                 What Our Users Say
//             </h2>
//             <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3">
//                 {testimonials.map((t, idx) => (
//                     <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow">
//                         <p className="text-gray-600 italic">“{t.content}”</p>
//                         <h3 className="text-lg font-bold mt-4">{t.name}</h3>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// // Call to Action
// function CTASection({ onClick, isAuthenticated }: { onClick: () => void; isAuthenticated: boolean; }) {
//     return (
//         <div className="py-16 bg-gradient-to-bl from-green-50 to-green-100 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
//                 Ready to Get Started?
//             </h2>
//             <button
//                 onClick={onClick}
//                 className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 font-bold"
//             >
//                 {isAuthenticated ? "Visit Your Dashboard" : "Sign In with Google"}
//             </button>
//         </div>
//     );
// }


"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Hero = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-re border">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-tr from-gray-50 to-gray-100 border-b shadow-sm"> */}
                <div className="flex flex-col justify-center items-start space-y-4">
                    <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg text-gray-900">
                        DHex Hedging Crypto{" "}
                        <span className="text-green-500">Volatility</span>
                    </h1>
                    <p className="text-xl drop-shadow-md text-gray-700">
                        Hedge your crypto volatility with Dhex and stay ahead in the ever-changing market.
                    </p>
                    <button
                        onClick={handleClick}
                        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                    >
                        {status === "authenticated" ? "Go to Dashboard" : "Login with Google"}
                    </button>
                </div>
                {/* <div className="flex justify-center items-center p-1">
                    <Image
                        src="https://www.chaidex.com/assets/images/unlock-value/unlock-value-light.svg"
                        alt="hero"
                        width={300}
                        height={300}
                        className="transform hover:scale-110 transition duration-300 shadow-xl"
                    />
                </div> */}

                <div className="flex justify-center items-center p-1">
                    <img src="https://www.chaidex.com/assets/images/unlock-value/unlock-value-light.svg" alt="hero" className="w-96 h-96 transform hover:scale-110 transition duration-300 shadow-1xl" />
                </div>
            </div>

            {/* Stats Section */}
            <StatsSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* Roadmap Section */}
            <RoadmapSection />

            <SupportedChainsSection />

            {/* Trusted By Section */}
            {/* <TrustedBySection /> */}

            {/* FAQs Section */}
            <FAQSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Call to Action */}
            <CTASection onClick={handleClick} isAuthenticated={status === "authenticated"} />
        </div>
    );
};

// Stats Section
function StatsSection() {
    return (
        <div className="bg-white py-10 shadow-sm border-b">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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

// Trusted By Section
function TrustedBySection() {

    const companies = [
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/solana-sol-logo.png",
        "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        "https://cryptologos.cc/logos/polygon-matic-logo.png",
        "https://cryptologos.cc/logos/cardano-ada-logo.png",
        "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
        "https://cryptologos.cc/logos/avalanche-avax-logo.png",
        "https://cryptologos.cc/logos/tron-trx-logo.png",
        "https://cryptologos.cc/logos/stellar-xlm-logo.png",
        "https://cryptologos.cc/logos/xrp-xrp-logo.png",
        "https://cryptologos.cc/logos/uniswap-uni-logo.png",
        "https://cryptologos.cc/logos/aave-aave-logo.png",
        "https://cryptologos.cc/logos/chainlink-link-logo.png",
    ];



    return (
        <div className="py-16 bg-gray-50">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
                Trusted By Leading Crypto Foundations
            </h2>
            <div className="overflow-hidden space-y-6">
                {/* Row 1 - Sliding Right to Left */}
                <div className="relative overflow-hidden">
                    <div className="flex space-x-8 animate-slide-infinite">
                        {companies.map((logo, idx) => (
                            <img
                                key={idx}
                                src={logo}
                                alt={`Company ${idx}`}
                                className="h-16 w-16 rounded-full shadow hover:scale-125 transition-transform duration-300"
                            />
                        ))}
                    </div>
                </div>

                {/* Row 2 - Sliding Left to Right */}
                <div className="relative overflow-hidden">
                    <div className="flex space-x-8 animate-slide-infinite-reverse">
                        {companies.reverse().map((logo, idx) => (
                            <img
                                key={idx}
                                src={logo}
                                alt={`Company ${idx}`}
                                className="h-16 w-16 rounded-full shadow hover:scale-125 transition-transform duration-300"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes slide-right {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(-100%);
                    }
                }
                @keyframes slide-left {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(100%);
                    }
                }
                .animate-slide-infinite {
                    display: flex;
                    animation: slide-right 15s linear infinite;
                }
                .animate-slide-infinite-reverse {
                    display: flex;
                    animation: slide-left 15s linear infinite;
                }
            `}</style>
        </div>
    );
}


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

// Call to Action
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



'use client';
import { signIn, useSession } from "next-auth/react";
import { SecondaryButton } from "./Button";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const session = useSession();
    const router = useRouter();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-re border">
            <div className="flex flex-col justify-center items-start space-y-4">
                <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">DHex Hedging Crypto <span className="text-green-500">Volatility </span></h1>
                <p className="text-xl drop-shadow-md">Hedge your crypto volatility with Dhex</p>
                {/* <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                    Get Started
                </button> */}

                {session.data?.user ? <SecondaryButton onClick={() => {
                    router.push("/dashboard");
                }}> Go to Dashboard </SecondaryButton> : <SecondaryButton onClick={() => {
                    signIn("google", { prompt: "select_account" });
                }}> Login with google </SecondaryButton>}
            </div>
            <div className="flex justify-center items-center p-1">
                <img src="https://www.chaidex.com/assets/images/unlock-value/unlock-value-light.svg" alt="hero" className="w-96 h-96 transform hover:scale-110 transition duration-300 shadow-1xl" />
            </div>
        </div>
    );
}
'use client';

import { useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { PrimaryButton } from "./Button";

export const Appbar = () => {
    //const session = useSession();
    const { data: session, status } = useSession();

    // useEffect(() => {
    //     console.log('Session:', session);
    //     console.log('Session Data:', session.data);
    //     console.log('process.env:', process.env.GOOGLE_CLIENT_ID);
    // }, [session]);

    return (
        <div className="border-b px-2 py-2 flex justify-between">
            <div className="text-xl font-bold flex flex-col justify-center">
                DHEX
            </div>
            <div className="mr-4">
                {status === "loading" && (
                    <div className="loaderHero" style={{ marginRight: '10px' }}></div>
                )}
                {status === "authenticated" && session?.user ? (
                    <PrimaryButton onClick={() => { signOut({ redirect: false }) }}>Logout</PrimaryButton>
                ) : status === "unauthenticated" ? (
                    <PrimaryButton onClick={() => { signIn("google", { prompt: "select_account" }); }}>SignIn</PrimaryButton>
                ) : null}
            </div>
        </div>
    );
}
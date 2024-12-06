'use client';

import { useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { PrimaryButton } from "./Button";

export const Appbar = () => {
    const session = useSession();

    useEffect(() => {
        console.log('Session:', session);
        console.log('Session Data:', session.data);
        console.log('process.env:', process.env.GOOGLE_CLIENT_ID);
    }, [session]);

    return (
        <div className="border-b px-2 py-2 flex justify-between">
            <div className="text-xl font-bold flex flex-col justify-center">
                DHEX
            </div>
            <div>
                {session.data?.user ? (
                    <PrimaryButton onClick={() => { signOut({ redirect: false }) }}>Logout</PrimaryButton>
                ) : (
                    <PrimaryButton onClick={() => { signIn("google", { prompt: "select_account" }); }}>SignIn</PrimaryButton>
                )}
            </div>
        </div>
    );
}
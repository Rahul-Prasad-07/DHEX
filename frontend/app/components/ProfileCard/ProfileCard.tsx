"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Greeting } from "./Greeting";
import { Assets } from "./Assets";

export const ProfileCard = ({ publicKey }: { publicKey: string }) => {
    const session = useSession();
    const router = useRouter();

    if (session.status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loaderr"></div>
            </div>
        );
    }

    if (!session.data?.user) {
        router.push("/");
        return null;
    }

    return (
        <div className="pt-8 flex justify-center">
            <div className="max-w-3xl bg-white rounded shadow w-full p-8">
                <Greeting
                    image={session.data?.user?.image ?? ""}
                    name={session.data?.user?.name ?? ""}
                />

                {/* This Assets code has functionalities of SEND  ADD_FUNDS WITHDRAW SWAP */}
                <Assets publicKey={publicKey} />
            </div>
        </div>
    );
}


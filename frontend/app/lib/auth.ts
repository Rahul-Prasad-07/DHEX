import GoogleProvider from "next-auth/providers/google";
import db from "@/app/db";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { Session } from "inspector/promises";


export interface session extends Session {
    user: {
        email: string;
        name: string;
        image: string;
        uid: string;
    },
    expires: string;
}

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const transfer = async ({ to, amount }: any) => {
    // const from = process.env.SOLANA_PRIVATE_KEY;
    // from = GfwaVQP72oDuDoSzDihPToE17jfZbVbwg42ucUJw2jY4
    const from = [124, 91, 10, 213, 62, 187, 195, 57, 127, 74, 221, 77, 66, 49, 78, 143, 236, 228, 145, 183, 245, 13, 48, 93, 188, 119, 205, 63, 47, 13, 234, 255, 232, 217, 21, 228, 45, 178, 157, 189, 150, 29, 195, 156, 5, 185, 23, 21, 118, 238, 255, 215, 177, 236, 44, 112, 169, 173, 194, 30, 6, 125, 100, 89];
    // console.log("from", from);
    const transaction = new Transaction();

    if (!from) {
        throw new Error("SOLANA_PRIVATE_KEY is not defined");
    }
    const fromKeypair = Keypair.fromSecretKey(new Uint8Array(from));  // Assuming privateKeyArray is correctly initialized

    //get public key of from
    const fromPublicKey = fromKeypair.publicKey;
    console.log("fromPublicKey", fromPublicKey);

    const toPublicKey = new PublicKey(to);
    console.log("toPublicKey", toPublicKey);

    const instruction = SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * LAMPORTS_PER_SOL
    });

    transaction.add(instruction);

    await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
    console.log("Transfer complete");
}

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET || 'secrt4',
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        })
    ],

    // A database is optional, but required to persist accounts in a database
    // callbacks if we want to do something after signin or signout

    callbacks: {

        session: ({ session, token }: any): session => {
            const newSession: session = session as session;
            if (newSession.user && token.uid) {
                newSession.user.uid = token.uid ?? "";
            }

            newSession.expires = session.expires ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(); // default to 30 days
            return newSession;
        },

        async jwt({ token, account, profile }: any) {
            const user = await db.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? ""
                }
            })

            if (user) {
                token.uid = user.id;
            }

            return token;
        },



        async signIn({ user, account, profile, email, credentials }: any) {

            if (account?.provider === "google") {
                const email = user?.email;
                if (!email) {
                    return false;
                }

                // check user exist in database
                const userDb = await db.user.findFirst({
                    where: {
                        username: email
                    }
                })

                if (userDb) {
                    console.log("User already exist in database", userDb);
                    return true;
                }

                // create private and public key for the user
                const keyPair = Keypair.generate();
                const publicKey = keyPair.publicKey.toBase58();
                const privateKey = keyPair.secretKey;
                console.log("Public Key", publicKey);
                // console.log("Private Key", privateKey);


                try {
                    await transfer({ to: publicKey, amount: 0.0009000 });
                    const balance = await connection.getBalance(new PublicKey(publicKey));

                    console.log(`Transfer complete, Balance of user's ${publicKey} is ${balance}`);
                } catch (error) {
                    console.error("Error during transfer:", error);
                    return false;
                }


                //<-- create user in database-->
                await db.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        //@ts-ignore
                        profilePicture: profile?.picture,
                        provider: "GOOGLE",
                        sub: account?.providerAccountId,
                        SolWallet: {

                            // create a solana wallet for the user
                            create: {
                                publicKey: publicKey,
                                privateKey: privateKey.toString(),
                            }
                        },

                        InrWallet: {
                            create: {
                                balance: 0,
                            }
                        },

                    }
                })

                return true;
            }

            return false;
        },

    }

}
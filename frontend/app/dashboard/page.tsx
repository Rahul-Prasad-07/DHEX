import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import db from '@/app/db';
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/lib/auth";



// after creating the ProfileCard component separately, 
// now it's become server component so now you can grab something from server or database 
// and show it in the ProfileCard component

export default async function Dashboard() {

    const userWallet = await getUserWallet();
    if(userWallet.error || !userWallet.userWallet?.publicKey){
        return <div>
           No Solana Wallet Found
        </div>
    }


    return <div>
        <ProfileCard publicKey={userWallet.userWallet?.publicKey} />
    </div>
}

async function getUserWallet(){

    const session = await getServerSession(authConfig);
    
    const userWallet = await db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        
        },
        select: {
            publicKey: true
        }
        
    })

    if(!userWallet){
        return {
            error: "User not found"
        }
    }

    return {
        error: null,
        userWallet
    }
}

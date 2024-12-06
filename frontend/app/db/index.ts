
// every user has a solana wallet and an inr wallet
// steps to setup the database
// 1. initialize the database
// 2. start the database
// 3. migrate the database : put entries in the database or create tables --> npx prisma migrate dev


//This file is simple export the prisma client
// but for next js we need to export the prisma client in a different way --> if u don't do this then it will create a new prisma client everytime and reach the max connection limit
// 1. create singleton prisma client(function actully intialize the prisma client)
// 2. if u are in production mode then use the singleton prisma client(re-compile again & again) and if not then create a new prisma client


import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
}

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = global as unknown as { prisma: prismaClientSingleton | undefined };

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
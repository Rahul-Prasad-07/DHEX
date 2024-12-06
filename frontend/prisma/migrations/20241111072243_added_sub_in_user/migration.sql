-- AlterTable
ALTER TABLE "User" ADD COLUMN     "inrWalletId" TEXT,
ADD COLUMN     "solWalletId" TEXT,
ADD COLUMN     "sub" TEXT NOT NULL DEFAULT '';

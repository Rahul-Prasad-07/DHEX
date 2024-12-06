/*
  Warnings:

  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider" NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

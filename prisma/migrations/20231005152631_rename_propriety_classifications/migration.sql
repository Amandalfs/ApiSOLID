/*
  Warnings:

  - You are about to drop the column `gynId` on the `classifications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `classifications` table. All the data in the column will be lost.
  - Added the required column `gym_id` to the `classifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `classifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "classifications" DROP CONSTRAINT "classifications_gynId_fkey";

-- DropForeignKey
ALTER TABLE "classifications" DROP CONSTRAINT "classifications_userId_fkey";

-- AlterTable
ALTER TABLE "classifications" DROP COLUMN "gynId",
DROP COLUMN "userId",
ADD COLUMN     "gym_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "classifications" ADD CONSTRAINT "classifications_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classifications" ADD CONSTRAINT "classifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

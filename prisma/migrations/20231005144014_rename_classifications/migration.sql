/*
  Warnings:

  - You are about to drop the column `class` on the `classifications` table. All the data in the column will be lost.
  - Added the required column `note` to the `classifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classifications" DROP COLUMN "class",
ADD COLUMN     "note" INTEGER NOT NULL;

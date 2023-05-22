/*
  Warnings:

  - You are about to alter the column `latitude` on the `gyns` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.
  - You are about to alter the column `longitude` on the `gyns` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_gyns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL
);
INSERT INTO "new_gyns" ("description", "id", "latitude", "longitude", "phone", "title") SELECT "description", "id", "latitude", "longitude", "phone", "title" FROM "gyns";
DROP TABLE "gyns";
ALTER TABLE "new_gyns" RENAME TO "gyns";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

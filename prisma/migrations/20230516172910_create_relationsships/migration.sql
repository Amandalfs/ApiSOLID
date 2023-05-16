/*
  Warnings:

  - Added the required column `gyn_id` to the `check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_check_ins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" DATETIME,
    "user_id" TEXT NOT NULL,
    "gyn_id" TEXT NOT NULL,
    CONSTRAINT "check_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "check_ins_gyn_id_fkey" FOREIGN KEY ("gyn_id") REFERENCES "gyns" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_check_ins" ("created_at", "id", "validated_at") SELECT "created_at", "id", "validated_at" FROM "check_ins";
DROP TABLE "check_ins";
ALTER TABLE "new_check_ins" RENAME TO "check_ins";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

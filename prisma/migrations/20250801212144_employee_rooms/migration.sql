/*
  Warnings:

  - You are about to drop the `_Occupants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_Occupants" DROP CONSTRAINT "_Occupants_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Occupants" DROP CONSTRAINT "_Occupants_B_fkey";

-- DropTable
DROP TABLE "public"."_Occupants";

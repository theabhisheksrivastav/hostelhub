/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_roomId_fkey";

-- AlterTable
ALTER TABLE "public"."Employee" ALTER COLUMN "roomId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "public"."Employee"("email");

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

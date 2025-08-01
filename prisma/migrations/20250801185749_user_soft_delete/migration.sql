-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Hostel" DROP CONSTRAINT "Hostel_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_ownerId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "scheduledForDeletionAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "public"."Hostel" ADD CONSTRAINT "Hostel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

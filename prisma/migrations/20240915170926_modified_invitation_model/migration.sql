/*
  Warnings:

  - You are about to drop the column `inviteeId` on the `Invitation` table. All the data in the column will be lost.
  - Added the required column `inviteeEmail` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_inviteeId_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "inviteeId",
ADD COLUMN     "inviteeEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

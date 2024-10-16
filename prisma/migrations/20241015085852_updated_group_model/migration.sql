-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxMembers" INTEGER NOT NULL DEFAULT 1000,
ADD COLUMN     "password" TEXT;

/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `LikeOnArticle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LikeOnArticle" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "ViewOnArticle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViewOnArticle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ViewOnArticle" ADD CONSTRAINT "ViewOnArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

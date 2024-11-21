-- AddForeignKey
ALTER TABLE "LikeOnArticle" ADD CONSTRAINT "LikeOnArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

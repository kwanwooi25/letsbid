import { Article, Attachment, AuctionCase, User } from '@prisma/client';

export type ArticleWithAuctionCaseAuthorAttachments = Article & {
  auctionCase: AuctionCase;
  author: User;
  attachments: Attachment[];
};

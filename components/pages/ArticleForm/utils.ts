import { ArticleWithAuctionCaseAuthorAttachments } from '@/features/article/types';
import { ArticleFormSchema } from './formSchema';

export function getDefaultFormValues({
  auctionCaseId,
  article,
}: {
  auctionCaseId?: string | null;
  article?: ArticleWithAuctionCaseAuthorAttachments | null;
}): ArticleFormSchema {
  if (!article) {
    return {
      title: '',
      contentHtml: '',
      isPublished: false,
      auctionCaseId,
    };
  }

  const { id, title, isPublished } = article;

  return {
    id,
    title,
    isPublished,
    auctionCaseId,
  };
}

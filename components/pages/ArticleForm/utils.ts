import { ArticleFormSchema } from './formSchema';

export function getDefaultFormValues({
  auctionCaseId,
}: {
  auctionCaseId?: string | null;
}): ArticleFormSchema {
  return {
    title: '',
    contentHtml: '',
    isPublished: false,
    auctionCaseId,
  };
}

'use client';

import Editor from '@/components/Editor';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import WithLabel from '@/components/WithLabel';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { uploadImageMutationOptions } from '@/queries/image/mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQueries } from '@tanstack/react-query';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import { ComponentProps, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { ArticleFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function ArticleForm({ auctionCaseId }: Props) {
  const ref = useRef<ComponentProps<typeof ToastUIEditor>['ref']>(null);
  const form = useForm<ArticleFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ auctionCaseId }),
  });
  const [isPublished] = useWatch({ control: form.control, name: ['isPublished'] });
  const [{ data: auctionCase }] = useSuspenseQueries({
    queries: [getAuctionCaseDetailQueryOptions(auctionCaseId)],
  });
  const { mutateAsync: uploadImage } = useMutation(uploadImageMutationOptions);

  const isEditMode = false;
  const formTitle = isEditMode ? '조사 내용 수정' : '조사 내용 등록';

  const handleSave = () => {
    const content = ref.current?.getInstance().getHTML();
    form.setValue('contentHtml', content);

    form.handleSubmit(async (values: ArticleFormSchema) => {
      // TODO:
      console.log(values);
    })();
  };

  const handleImageAdd = async (blob: File, callback: Function) => {
    const [originalfileName, extension] = blob.name.split('.');
    const fileName = `articles/${auctionCaseId}/${originalfileName}_${new Date().getTime()}.${extension}`;
    const imageUrl = await uploadImage({ file: blob, fileName });
    callback(imageUrl);
  };

  return (
    <Form {...form}>
      <form className="max-w-3xl mx-auto">
        <PageHeader
          title={
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">{formTitle}</span>
              <span className="text-sm font-semibold opacity-50">{auctionCase!.caseName}</span>
            </div>
          }
          backButton
        >
          <div className="h-[40px] flex items-center space-x-2 shrink-0">
            <Switch
              id="isPublished"
              checked={isPublished}
              onCheckedChange={(checked) => form.setValue('isPublished', checked)}
            />
            <Label htmlFor="isPublished">게시</Label>
          </div>
          <Button type="button" onClick={handleSave}>
            저장
          </Button>
        </PageHeader>
        <PageBody className="flex flex-col gap-4">
          <InputFormField
            control={form.control}
            name="title"
            label="제목"
            required
            inputProps={{ autoFocus: true }}
          />
          <WithLabel label="내용" required>
            <Editor ref={ref} height="50vh" hooks={{ addImageBlobHook: handleImageAdd }} />
          </WithLabel>
        </PageBody>
      </form>
    </Form>
  );
}

type Props = {
  auctionCaseId: string;
};

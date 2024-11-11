import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
  email: z.string().optional(),
  mobile: z.string().optional(),
  image: z.string().optional(),
  imageToUpload: z
    .any()
    .refine((file) => !file || file?.type.includes('image'), '이미지 파일만 업로드 가능합니다')
    .optional(),
  imageToDelete: z.string().optional(),
});

export type UserFormSchema = z.infer<typeof formSchema>;

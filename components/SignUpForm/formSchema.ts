import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(1, { message: '이름을 입력해주세요' }),
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요' })
      .email({ message: '올바른 이메일 형식으로 입력해주세요' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
    passwordConfirm: z.string().min(1, { message: '비밀번호를 한번 더 입력해주세요' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type SignUpFormSchema = z.infer<typeof formSchema>;

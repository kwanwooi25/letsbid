'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

export default function AuthRequired() {
  return (
    <div className="flex flex-col gap-4 items-center py-8">
      <span className="text-lg">로그인이 필요합니다</span>
      <Button onClick={() => signIn('kakao')} type="button" size="lg">
        카카오 계정으로 로그인
      </Button>
    </div>
  );
}

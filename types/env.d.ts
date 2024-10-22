import 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'production' | 'development' | 'local';
      NEXT_PUBLIC_APP_ENV: 'production' | 'development' | 'local';
    }
  }
}

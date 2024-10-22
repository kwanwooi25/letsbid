export const getAppEnv = () => {
  return process.env.APP_ENV ?? process.env.NEXT_PUBLIC_APP_ENV;
};

export const getAppEnvTag = () => {
  const appEnv = getAppEnv();
  let appEnvTag = '';

  switch (appEnv) {
    case 'local':
      appEnvTag = 'LOCAL';
      break;
    case 'development':
      appEnvTag = 'DEV';
      break;
    case 'production':
    default:
      break;
  }
  return appEnvTag;
};

export const getAppName = () => {
  const appEnvTag = getAppEnvTag();
  return `${appEnvTag ? `[${appEnvTag}] ` : ''}런포유비드`;
};

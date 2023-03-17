export enum Env {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'production',
}

type Configuration = {
  NODE_ENV: string;
  PORT: number;
  SERVICE_EMAIL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REFRESH_TOKEN: string;
  GOOGLE_OAUTH_REDIRECT_URL: string;
  RAPIDAPI_URL: string;
  rapidApiReqHeaders: Record<string, string>;
};

export default (): Configuration => ({
  NODE_ENV: process.env.NODE_ENV || Env.DEV,
  PORT: Number(process.env.PORT || 3000),
  SERVICE_EMAIL: process.env.SERVICE_EMAIL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GOOGLE_OAUTH_REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL,
  RAPIDAPI_URL: process.env.RAPIDAPI_URL,
  rapidApiReqHeaders: {
    'x-rapidapi-host': process.env.RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
  }
});

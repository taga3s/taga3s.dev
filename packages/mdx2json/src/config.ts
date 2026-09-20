import puppeteer, { type Browser, type LaunchOptions } from "puppeteer";

export let headlessBrowser: Browser | null = null;

export const getBrowser = async (): Promise<Browser> => {
  if (headlessBrowser) {
    return headlessBrowser;
  }

  const puppetteerOptions: LaunchOptions = {
    ...(process.env.CI && {
      executablePath: "/usr/bin/google-chrome-stable",
    }),
    headless: true,
  };

  headlessBrowser = await puppeteer.launch(puppetteerOptions);

  return headlessBrowser;
};

export const postRunningBrowser = async (): Promise<void> => {
  if (headlessBrowser) {
    await headlessBrowser.close();
    headlessBrowser = null;
  }
};

interface R2Config {
  bucketNm: string;
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export const getR2Config = (): R2Config => {
  const _validate = (name: string, value: string | undefined): string => {
    if (typeof value !== "string") {
      throw new Error(`Error while reading ${name} from env`);
    }
    return value;
  };

  const bucketNm = "taga3s-dev";
  const values = {
    accountId: _validate("accountId", process.env.CLOUDFLARE_ACCOUNT_ID),
    accessKeyId: _validate("accessKeyId", process.env.CLOUDFLARE_ACCESS_KEY_ID),
    secretAccessKey: _validate("secretAccessKey", process.env.CLOUDFLARE_SECRET_ACCESS_KEY),
  };

  return {
    bucketNm,
    ...values,
  };
};

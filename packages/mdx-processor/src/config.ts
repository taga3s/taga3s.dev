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

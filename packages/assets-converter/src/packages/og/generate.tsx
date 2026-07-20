import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori, { init } from "satori";
import initYoga from "yoga-wasm-web";
import { load as loadGoogleFont } from "./google-font";
import { ImageBase } from "./Image-template";
import resvgWasm from "./vendor/resvg.wasm";
import yogaWasm from "./vendor/yoga.wasm";

const genModuleInit = () => {
  let isInit = false;
  return async () => {
    if (isInit) {
      return;
    }

    init(await initYoga(yogaWasm));
    await initWasm(resvgWasm);
    isInit = true;
  };
};

const moduleInit = genModuleInit();

export const generateOGImage = async (title: string): Promise<Uint8Array<ArrayBuffer>> => {
  await moduleInit();

  const notoSans = await loadGoogleFont({
    family: "Noto Sans JP",
    weight: 600,
  });

  const svg = await satori(<ImageBase title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "NotoSansJP",
        data: notoSans,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  // In TypeScript 5.9, TypedArray has been changed to be generics to distinguish ArrayBuffer and SharedArrayBuffer. So, we need to do type assertion here.
  const pngBuffer = pngData.asPng() as Uint8Array<ArrayBuffer>;

  return pngBuffer;
};

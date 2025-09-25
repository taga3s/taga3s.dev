import resvgWasm from "./vendor/resvg.wasm";
import yogaWasm from "./vendor/yoga.wasm";
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import { loadGoogleFont } from "./load-google-font";
import { ImageBase } from "./Image-template";

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

export const generateOGImage = async (title: string): Promise<Uint8Array<ArrayBufferLike>> => {
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
  const pngBuffer = pngData.asPng();

  return pngBuffer;
};

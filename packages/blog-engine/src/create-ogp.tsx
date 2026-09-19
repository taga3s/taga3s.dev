import type { FC } from "react";
import satori, { type Font, FontWeight, init } from "satori";
import initYoga from "yoga-wasm-web/asm";
import { svg2png, initialize } from "svg2png-wasm";
import wasm from "svg2png-wasm/svg2png_wasm_bg.wasm";

const genModuleInit = () => {
  let isInit = false;

  return async () => {
    if (isInit) {
      return;
    }

    console.log("Initializing module...");

    await init(initYoga());
    await initialize(wasm);

    isInit = true;
  };
};

const moduleInit = genModuleInit();
const cache = await caches.open("blog-engine-ogp-cache");

const getFont = async (ctx: ExecutionContext, fontName: string, weight: FontWeight): Promise<Font | undefined> => {
  const cacheKey = `http://font/${encodeURI(fontName)}`;

  const response = await cache.match(cacheKey);
  if (response) {
    return {
      name: fontName,
      data: await response.arrayBuffer(),
      weight,
      style: "normal",
    };
  }

  const data = await downloadFont(fontName, weight);
  if (data) {
    ctx.waitUntil(cache.put(cacheKey, new Response(data)));
    return { name: fontName, data, weight, style: "normal" };
  }

  return undefined;
};

const downloadFont = async (fontName: string, weight: number) => {
  return await fetch(`https://fonts.googleapis.com/css2?family=${encodeURI(fontName)}:wght@${weight}`)
    .then((res) => res.text())
    .then((css) => css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1])
    .then(async (url) => {
      return url ? fetch(url).then((v) => (v.status === 200 ? v.arrayBuffer() : undefined)) : undefined;
    });
};

const generateOgp = async (options: {
  title: string;
  width: number;
  height?: number;
  fonts: Font[];
}): Promise<Uint8Array<ArrayBuffer>> => {
  const svg = await satori(<OGPTemplate title={options.title} />, {
    width: options.width,
    height: options.height,
    fonts: options.fonts,
  });

  return (await svg2png(svg)) as Uint8Array<ArrayBuffer>;
};

const OGPTemplate: FC<{
  title: string;
}> = ({ title }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "#fef9ef",
        fontWeight: 600,
        padding: 64,
        borderRight: "56px solid #38bcd3",
      }}
    >
      <div
        style={{
          color: "#000000",
          fontSize: 56,
          maxWidth: 1000,
          marginTop: 24,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color: "#000000",
            fontSize: 48,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/107479598?s=400&u=fc33cc981efd0eec445dba32cfc294a4e6a045ec&v=4"
            alt="taga3s-dev"
            width={64}
            height={64}
            style={{ borderRadius: 9999, marginRight: 24 }}
          />
          taga3s-dev
        </div>
      </div>
    </div>
  );
};

export const createOgp = async (ctx: ExecutionContext, title: string): Promise<Uint8Array<ArrayBuffer> | undefined> => {
  await moduleInit();

  const font = await getFont(ctx, "Noto Sans JP", 600);
  if (!font) {
    return undefined;
  }

  return await generateOgp({ title, width: 1200, height: 630, fonts: [font] });
};

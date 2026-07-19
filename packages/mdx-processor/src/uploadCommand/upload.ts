import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type Command, type CommandRunner, define, type GunshiParams } from "gunshi";
import { getFileContents } from "../core/utils.ts";

const BUCKET_NM = "taga3s-dev";
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID as string;
const ACCESS_KEY_ID = process.env.CLOUDFLARE_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string;

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export const uploadCommand: Command = define({
  name: "upload",
  args: {
    pathdir: {
      type: "string",
      short: "d",
      description: "Directory path for .mdx files",
    },
  },
});

export const uploadProcessor = async (): Promise<CommandRunner<GunshiParams<{ args: typeof uploadCommand.args }>>> => {
  return async (ctx) => {
    const { pathdir } = ctx.values;
    if (typeof pathdir !== "string") {
      return;
    }

    const fileContents = await getFileContents(pathdir);

    try {
      // Currently support `upload` only
      await Promise.all(
        fileContents.map(async (fc) => {
          const command = new PutObjectCommand({
            Bucket: BUCKET_NM,
            Body: fc.content,
            Key: `blog/${fc.origName}`,
            ContentType: "application/json",
          });
          await S3.send(command);
          console.log(`Successfully uploaded to r2 bucket. Key: blog/${fc.origName}`);
        }),
      );
    } catch (err) {
      throw new Error("Error uploading blog data to r2", { cause: err });
    }
  };
};

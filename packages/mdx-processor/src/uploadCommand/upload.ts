import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type Command, type CommandRunner, define, type GunshiParams } from "gunshi";
import { getFileContents } from "../core/utils.ts";
import { getR2Config } from "../config.ts";

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
  const config = getR2Config();

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

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
            Bucket: config.bucketNm,
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

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type Command, type CommandRunner, define, type GunshiParams } from "gunshi";
import { getR2Config } from "../config.ts";
import { getFileContents } from "../core/utils.ts";

export const uploadCommand: Command = define({
  name: "upload",
  args: {
    pathdir: {
      type: "string",
      short: "d",
      description: "Directory path for .mdx files",
    },
    preview: {
      type: "boolean",
      short: "p",
      description: "Upload environment is preview or not",
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
    const { pathdir, preview } = ctx.values;
    if (typeof pathdir !== "string" || typeof preview !== "boolean") {
      return;
    }

    const blogKeyPrefix = preview ? "blog/preview" : "blog";

    const fileContents = await getFileContents(pathdir);

    try {
      // Currently support `upload` only
      await Promise.all(
        fileContents.map(async (fc) => {
          const command = new PutObjectCommand({
            Bucket: config.bucketNm,
            Body: fc.content,
            Key: `${blogKeyPrefix}/${fc.origName}`,
            ContentType: "application/json",
          });
          await S3.send(command);
          console.log(`Successfully uploaded to r2 bucket. Key: ${blogKeyPrefix}/${fc.origName}`);
        }),
      );
    } catch (err) {
      throw new Error("Error uploading blog data to r2", { cause: err });
    }
  };
};

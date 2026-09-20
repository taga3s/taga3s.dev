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
      default: false,
    },
  },
});

export const uploadProcessor = async (): Promise<CommandRunner<GunshiParams<{ args: typeof uploadCommand.args }>>> => {
  const config = getR2Config();

  const R2 = new S3Client({
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
    const contents = await getFileContents(pathdir);

    try {
      // Currently support `upload` only
      await Promise.all(
        contents.map(async (c) => {
          const command = new PutObjectCommand({
            Bucket: config.bucketNm,
            Body: c.content,
            Key: `${blogKeyPrefix}/${c.origName}`,
            ContentType: "application/json",
          });
          await R2.send(command);
          console.log(`Successfully uploaded to r2 bucket. Key: ${blogKeyPrefix}/${c.origName}`);
        }),
      );
    } catch (err) {
      throw new Error("Error uploading blog data to r2", { cause: err });
    }
  };
};

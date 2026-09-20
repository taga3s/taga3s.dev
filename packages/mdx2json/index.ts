import { cli, lazy } from "gunshi";
import { postRunningBrowser } from "./src/config.ts";
import { runCommand, runProcessor } from "./src/runCommand/run.ts";
import { uploadCommand, uploadProcessor } from "./src/uploadCommand/upload.ts";

const runLazyProcess = lazy(runProcessor, runCommand);
const uploadProcess = lazy(uploadProcessor, uploadCommand);

const subCommands = {
  [runLazyProcess.commandName!]: runLazyProcess,
  [uploadProcess.commandName!]: uploadProcess,
};

await cli(
  process.argv.slice(2),
  {
    description: "mdx2json processes .mdx to convert to other formats, such as .html",
  },
  {
    name: "mdx2json",
    version: "1.0.0",
    subCommands,
    onAfterCommand: async () => {
      // for rehype-mermaid
      await postRunningBrowser();
    },
  },
);

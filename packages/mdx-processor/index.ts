import { cli, lazy } from "gunshi";
import { postRunningBrowser } from "./src/config.ts";
import { genatomCommand, genatomProcessor } from "./src/genatomCommand/genatom.ts";
import { runCommand, runProcessor } from "./src/runCommand/run.ts";

const runLazyProcess = lazy(runProcessor, runCommand);
const genatomProcess = lazy(genatomProcessor, genatomCommand);

const subCommands = {
  [runLazyProcess.commandName!]: runLazyProcess,
  [genatomProcess.commandName!]: genatomProcess,
};

await cli(
  process.argv.slice(2),
  {
    description: "mdx-processor processes .mdx to convert to other formats, such as .html",
  },
  {
    name: "mdx-processor",
    version: "1.0.0",
    subCommands,
    onAfterCommand: async () => {
      // for rehype-mermaid
      await postRunningBrowser();
    },
  },
);

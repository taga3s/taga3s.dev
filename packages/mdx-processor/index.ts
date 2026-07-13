import { cli, lazy } from "gunshi";
import { runCommand, runProcessor } from "./src/run.ts";

const lazyProcess = lazy(runProcessor, runCommand);

const subCommands = {
  [lazyProcess.commandName!]: lazyProcess,
};

await cli(
  process.argv.slice(2),
  {
    description: "mdx-processor processes .mdx to convert to other formats, such as .html",
    run: () => console.log("Use process command to transform data"),
  },
  {
    name: "mdx-processor",
    version: "1.0.0",
    subCommands,
  },
);

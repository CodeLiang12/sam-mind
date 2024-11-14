import { resolve, dirname } from "path";
import esbuild from "esbuild";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

esbuild
  .context({
    entryPoints: [resolve(__dirname, "../src/index.ts")],
    outfile: resolve(__dirname, "../dist/sam-mind.js"),
    bundle: true,
    sourcemap: true,
    format: "esm",
  })
  .then((ctx) => {
    console.log("Start dev~~");
    return ctx.watch();
  });

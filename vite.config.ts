import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    globals: true,
  },
  fmt: {
    printWidth: 120,
    trailingComma: "all",
    ignorePatterns: ["*.jsonc"],
  },
  lint: {
    ignorePatterns: ["packages/**/dist/**", "packages/**/wrangler.jsonc"],
    // options: {
    //   typeAware: true,
    //   typeCheck: true,
    // },
  },
  staged: {
    "*.{js,ts,jsx,tsx,css}": ["vp run format", "vp run lint"],
  },
});

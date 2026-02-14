import tailwind from "bun-plugin-tailwind";

const cssBuild = await Bun.build({
  entrypoints: ["./style.css"],
  plugins: [tailwind],
  minify: true,
  sourcemap: "none",
  outdir: "./.build",
});

if (!cssBuild.success) {
  for (const log of cssBuild.logs) {
    console.error(log.message);
  }
  process.exit(1);
}

await Bun.write("./style.css", Bun.file("./.build/style.css"));

const binaryBuild = await Bun.build({
  entrypoints: ["./index.ts"],
  minify: true,
  sourcemap: "none",
  compile: {
    outfile: "./design-candies",
    autoloadDotenv: false,
    autoloadBunfig: false,
  },
});

if (!binaryBuild.success) {
  for (const log of binaryBuild.logs) {
    console.error(log.message);
  }
  process.exit(1);
}

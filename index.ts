import { join } from "node:path";

const htmlRoutes = new Map<string, string>([
  ["/", "index.html"],
  ["/clicky-buttons", "clicky-buttons.html"],
  ["/theme-canvas", "theme-canvas.html"],
  ["/globes", "globes.html"],
  ["/sound-effects", "sound-effects.html"],
]);

const assetRoutes = new Map<string, { file: string; type: string }>([
  ["/style.css", { file: "style.css", type: "text/css; charset=utf-8" }],
]);

const rootDir = Bun.env.PUBLIC_DIR ?? ".";
const hostname = Bun.env.HOST ?? "0.0.0.0";
const port = Number(Bun.env.PORT ?? 3000);

const notFound = () => new Response("Not Found", { status: 404 });

const server = Bun.serve({
  hostname,
  port,
  fetch: async (req) => {
    const url = new URL(req.url);
    const pathname = url.pathname !== "/" && url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
    const htmlFile = htmlRoutes.get(pathname);

    if (htmlFile) {
      const file = Bun.file(join(rootDir, htmlFile));
      if (!(await file.exists())) return notFound();
      return new Response(file, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const asset = assetRoutes.get(pathname);
    if (asset) {
      const file = Bun.file(join(rootDir, asset.file));
      if (!(await file.exists())) return notFound();
      return new Response(file, {
        headers: { "Content-Type": asset.type },
      });
    }

    return notFound();
  },
});

console.log(`Design Candies running at [${server.url}]`);

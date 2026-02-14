import index from "./index.html";
import clickyButtons from "./clicky-buttons.html";
import themeCanvas from "./theme-canvas.html";
import globes from "./globes.html";
import soundEffects from "./sound-effects.html";

const hostname = Bun.env.HOST ?? "0.0.0.0";
const port = Number(Bun.env.PORT ?? 3000);
const isDev = Bun.env.NODE_ENV !== "production";

const server = Bun.serve({
  hostname,
  port,
  routes: {
    "/": index,
    "/clicky-buttons": clickyButtons,
    "/theme-canvas": themeCanvas,
    "/globes": globes,
    "/sound-effects": soundEffects,
    "/up": () => new Response("OK", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }),
  },
  development: isDev
    ? {
        hmr: true,
        console: true,
      }
    : undefined,
});

console.log(`Design Candies running at [${server.url}]`);

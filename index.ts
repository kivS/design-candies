import index from "./index.html";
import clickyButtons from "./clicky-buttons.html";
import themeCanvas from "./theme-canvas.html";
import globes from "./globes.html";

const server = Bun.serve({
  routes: {
    "/": index,
    "/clicky-buttons": clickyButtons,
    "/theme-canvas": themeCanvas,
    "/globes": globes,
  },
});

console.log(`Design Candies running at [${server.url}]`);

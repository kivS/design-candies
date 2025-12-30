import index from "./index.html";
import clickyButtons from "./clicky-buttons.html";
import themeCanvas from "./theme-canvas.html";

const server = Bun.serve({
  routes: {
    "/": index,
    "/clicky-buttons": clickyButtons,
    "/theme-canvas": themeCanvas,
  },
});

console.log(`Design Candies running at [${server.url}]`);

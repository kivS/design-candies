import index from "./index.html";
import clickyButtons from "./clicky-buttons.html";

const server = Bun.serve({
  routes: {
    "/": index,
    "/clicky-buttons": clickyButtons,
  },
});

console.log(`Design Candies running at [${server.url}]`);

import index from "./index.html";
import clickyButtons from "./clicky-buttons.html";

Bun.serve({
  routes: {
    "/": index,
    "/clicky-buttons": clickyButtons,
  },
});

console.log("Design Candies running at http://localhost:3000");

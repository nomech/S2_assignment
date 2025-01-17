import { render } from "./render.js";

const test = document.querySelectorAll(".button");

for (const button of test) {
  button.addEventListener("click", (event) => render(event));
}


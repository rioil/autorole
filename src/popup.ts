import browser from "webextension-polyfill";

init();

function init() {
  var button = document.querySelector<HTMLInputElement>(
    "input[id='openOptions']"
  );
  if (button) {
    button.addEventListener("click", openOptionsPage);
  }
}

async function openOptionsPage() {
  await browser.runtime.openOptionsPage();
  window.close();
}

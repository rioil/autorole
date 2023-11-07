var button = document.querySelector("input[id='openOptions']");
button.addEventListener("click", function (event) {
  browser.runtime.openOptionsPage();
});

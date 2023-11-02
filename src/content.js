"use strict";
import Enumerable from "linq";

init();

async function init() {
  const id = await browser.runtime.sendMessage({ type: "getId" });
  console.log(id);

  var table = document.querySelector("table.style_table2");
  if (table === null) {
    console.log("table not found.");
  }
  const roles = Enumerable.from(table.querySelectorAll("tr").values())
    .skip(2)
    .select(function (row) {
      var info = Enumerable.from(row.querySelectorAll("td").values())
        .skip(1)
        .take(3)
        .select(function (cell) {
          return cell.textContent.trim();
        })
        .toArray();
      return {
        id: info[0],
        affiliation: info[1],
        status: info[2],
      };
    })
    .toArray();
  await browser.runtime.sendMessage({ type: "setId", id: roles[0].id });

  // 最初のラジオボタンを選択
  // TODO どのラジオボタンをデフォルトで選択するかは変更可能にする
  var radio = document.querySelector('input[type="radio"][name="role"]');
  if (radio === null) {
    console.log("radio button not found.");
  } else {
    radio.style = "accent-color: red;";
    radio.click();
  }

  // OKボタンの有効化
  // MEMO: 最初にdisabledをfalseにしても，その後に他の処理で無効化されてしまうので，MutationObserverで監視して強制的に有効化
  var okButton = document.querySelector('input[type="button"][id="ok"]');
  if (okButton === null) {
    console.log("OK button not found.");
  } else {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "disabled") {
          mutation.target.disabled = false;
          console.log("set OK button enabled forcefully.");
        }
      });
    });

    observer.observe(okButton, { attributes: true });
  }
}

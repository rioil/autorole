import Enumerable from "linq";
import browser from "webextension-polyfill";
import { GetIdMessage, SetIdMessage } from "./BackgroundMessage";

init();

async function init() {
  const id = await browser.runtime.sendMessage(new GetIdMessage());
  console.log(id);

  var table = document.querySelector("table.style_table2");
  if (table === null) {
    console.log("table not found.");
    return;
  }

  const roles = Enumerable.from(table.querySelectorAll("tr").values())
    .skip(2)
    .select((row) =>
      Enumerable.from(row.querySelectorAll("td").values())
        .skip(1)
        .take(3)
        .select(function (cell) {
          return cell.textContent?.trim();
        })
        .toArray()
    )
    .select(function (info) {
      if (
        info.length === 3 &&
        info[0] !== undefined &&
        info[1] !== undefined &&
        info[2] !== undefined
      ) {
        return new Role(info[0], info[1], info[2]);
      } else {
        return undefined;
      }
    })
    .where((role): role is Role => role !== undefined)
    .toArray();

  // 最初のロールを選択
  const role = roles[0];
  if (role !== undefined) {
    await browser.runtime.sendMessage(new SetIdMessage(role.id));
  }

  // 最初のラジオボタンを選択
  // TODO どのラジオボタンをデフォルトで選択するかは変更可能にする
  var radio = document.querySelector<HTMLInputElement>(
    'input[type="radio"][name="role"]'
  );
  if (radio === null) {
    console.log("radio button not found.");
  } else {
    radio.style.accentColor = "red";
    radio.click();
  }

  // OKボタンの有効化
  // MEMO: 最初にdisabledをfalseにしても，その後に他の処理で無効化されてしまうので，MutationObserverで監視して強制的に有効化
  var okButton = document.querySelector<HTMLInputElement>(
    'input[type="button"][id="ok"]'
  );
  if (okButton === null) {
    console.log("OK button not found.");
  } else {
    okButton.focus();

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.target instanceof HTMLButtonElement &&
          mutation.attributeName === "disabled"
        ) {
          mutation.target.disabled = false;
          console.log("set OK button enabled forcefully.");
        }
      });
    });

    observer.observe(okButton, { attributes: true });
  }
}

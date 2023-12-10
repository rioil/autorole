import Enumerable from "linq";
import browser from "webextension-polyfill";
import {
  GetIdMessage,
  SetIdMessage,
  GetIsSelectFirstMessage,
} from "./backgroundMessage";
import { Role } from "./role";

/**
 * デフォルトのロール
 */
let defaultRole: Role | undefined = undefined;

init();

/**
 * 初期化処理を行います．
 */
async function init() {
  // 初期選択するロールを取得して選択
  defaultRole = await getDefaultRole();
  if (!defaultRole) {
    return;
  }
  setRoleState(defaultRole, true);

  // OKボタンを有効化
  enableOkButton();
}

/**
 * OKボタンを有効化します
 */
function enableOkButton() {
  // MEMO: 最初にdisabledをfalseにしても，その後に他の処理で無効化されてしまうので，MutationObserverで監視して強制的に有効化
  var okButton = document.querySelector<HTMLInputElement>(
    'input[type="button"][id="ok"]'
  );
  if (okButton) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.target instanceof HTMLInputElement &&
          mutation.attributeName === "disabled" &&
          mutation.target.disabled
        ) {
          mutation.target.disabled = false;
        }
      });
    });

    observer.observe(okButton, { attributes: true });
    okButton.disabled = false;
    okButton.focus();
  }
}

/**
 * 選択肢として表示されているロールの一覧を取得し，この拡張機能で使用する要素を追加します．
 *
 * @returns ロールのリスト
 */
function getRoles(): Role[] {
  var table = document.querySelector<HTMLTableElement>("table.style_table2");
  if (!table) {
    return [];
  }

  const roles = [];
  for (const row of Enumerable.from(table.rows).skip(2)) {
    if (row.cells.length < 4) {
      continue;
    }

    const radio = row.cells[0]?.querySelector<HTMLInputElement>(
      'input[type="radio"][name="role"]'
    );

    const id = row.cells[1]?.textContent?.trim();
    const affiliation = row.cells[2]?.textContent?.trim();
    const status = row.cells[3]?.textContent?.trim();

    if (!radio || !id || !affiliation || !status) {
      continue;
    }

    const button = document.createElement("button");
    const role = new Role(radio, button, id, affiliation, status);

    button.textContent = "Set as default";
    button.style.marginTop = "5px";
    button.addEventListener("click", () => setDefaultRole(role));
    row.cells[0]?.appendChild(button);

    roles.push(role);
  }

  return roles;
}

/**
 * 初期選択するデフォルトのロールを取得します．
 *
 * @remarks
 * デフォルトのロールが未設定であれば最初のロールをデフォルトのロールに設定し，設定されたロールを返します．
 * ロールが一つもなければ，undefinedを返します．
 *
 * @returns デフォルトのロール
 */
async function getDefaultRole(): Promise<Role | undefined> {
  const roles = getRoles();
  // ロールが一つもなければundefinedを返す
  if (roles[0] === undefined) {
    return undefined;
  }

  // 選択するロールを取得
  const id = await browser.runtime.sendMessage(new GetIdMessage());
  if (id) {
    const role = roles.find((role) => role?.id === id);
    if (role) {
      return role;
    }
  }

  const isSelectFirst = await browser.runtime.sendMessage(
    new GetIsSelectFirstMessage()
  );
  return isSelectFirst ? roles[0] : undefined;
}

/**
 * デフォルトのロールを設定します．
 * @param role ロール
 */
async function setDefaultRole(role: Role) {
  await browser.runtime.sendMessage(new SetIdMessage(role.id));
  if (defaultRole) {
    setRoleState(defaultRole, false);
  }
  defaultRole = role;
  setRoleState(defaultRole, true);
}

/**
 * ロールの状態を設定します．
 * @param role ロール
 * @param isDefault デフォルトのロールかどうか
 */
function setRoleState(role: Role, isDefault: boolean) {
  if (isDefault) {
    role.radio.style.accentColor = "red";
    role.button.style.display = "none";
    role.radio.click();
  } else {
    role.radio.style.accentColor = "";
    role.button.style.display = "inline";
  }
}

import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener(processMessage);

async function processMessage(message: any) {
  switch (message.type) {
    case "GetIdMessage":
      try {
        const id = await getId();
        return id;
      } catch (e) {
        console.error(e);
        return null;
      }
    case "SetIdMessage":
      try {
        await setId(message.roleId);
      } catch (e) {
        console.error(e);
      }
      break;
    case "GetIsSelectFirstMessage":
      try {
        const isSelectFirst = await getIsSelectFirst();
        return isSelectFirst === true;
      } catch (e) {
        console.error(e);
        return false;
      }
    default:
      console.log("unknown message: " + message);
      console.debug(message);
  }
}

/**
 * デフォルトのロールIDを取得します．
 * @returns デフォルトのロールID
 */
async function getId(): Promise<string | undefined> {
  const id = await browser.storage.sync.get("id");
  return id.id;
}

/**
 * デフォルトのロールIDを設定します．
 * @param id ロールID
 * @returns
 */
async function setId(id: string) {
  return browser.storage.sync.set({ id: id });
}

/**
 * ロールID不一致/未設定時に最初のロールを選択するかどうかを取得します．
 * @returns 最初のロールを選択する場合はtrue，そうでない場合はfalse
 */
async function getIsSelectFirst() {
  const isSelectFirst = await browser.storage.sync.get("isSelectFirst");
  return isSelectFirst.isSelectFirst;
}

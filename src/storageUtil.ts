import browser from "webextension-polyfill";

export namespace StorageUtil {
  /**
   * デフォルトのロールIDを取得します．
   * @returns デフォルトのロールID
   */
  export async function getId(): Promise<string | undefined> {
    const id = await browser.storage.sync.get("id");
    return id.id;
  }

  /**
   * デフォルトのロールIDを設定します．
   * @param id ロールID
   * @returns
   */
  export async function setId(id: string) {
    return browser.storage.sync.set({ id: id });
  }

  /**
   * ロールID不一致/未設定時に最初のロールを選択するかどうかを取得します．
   * @returns 最初のロールを選択する場合はtrue，そうでない場合はfalse
   */
  export async function getIsSelectFirst() {
    const isSelectFirst = await browser.storage.sync.get("isSelectFirst");
    return isSelectFirst.isSelectFirst;
  }

  /**
   * ロールID不一致/未設定時に最初のロールを選択するかどうかを設定します．
   * @param isSelectFirst 最初のロールを選択する場合はtrue，そうでない場合はfalse
   */
  export async function setIsSelectFirst(isSelectFirst: boolean) {
    browser.storage.sync.set({ isSelectFirst: isSelectFirst });
  }
}

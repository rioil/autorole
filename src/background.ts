import browser from "webextension-polyfill";
import { StorageUtil } from "./storageUtil";

browser.runtime.onMessage.addListener(processMessage);

async function processMessage(message: any) {
  switch (message.type) {
    case "GetIdMessage":
      try {
        const id = await StorageUtil.getId();
        return id;
      } catch (e) {
        console.error(e);
        return null;
      }
    case "SetIdMessage":
      try {
        await StorageUtil.setId(message.roleId);
      } catch (e) {
        console.error(e);
      }
      break;
    case "GetIsSelectFirstMessage":
      try {
        const isSelectFirst = await StorageUtil.getIsSelectFirst();
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

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
    default:
      console.log("unknown message: " + message);
      console.debug(message);
  }
}

async function getId(): Promise<string | undefined> {
  const id = await browser.storage.sync.get("id");
  return id.id;
}

async function setId(id: string) {
  return browser.storage.sync.set({ id: id });
}

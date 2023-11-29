import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener(processMessage);

async function processMessage(message: any) {
  if (message instanceof GetIdMessage) {
    try {
      const id = await getId();
      return id;
    } catch (e) {
      console.error(e);
      return null;
    }
  } else if (message instanceof SetIdMessage) {
    try {
      await setId(message.roleId);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log("unknown message: " + message);
  }
}

async function getId(): Promise<string> {
  const id = await browser.storage.sync.get("id");
  return id.id;
}

async function setId(id: string) {
  return browser.storage.sync.set({ id: id });
}

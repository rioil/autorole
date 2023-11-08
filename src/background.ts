import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener(processMessage);

async function processMessage(message: Message) {
  switch (message.type) {
    case "getId":
      try {
        const id = await getId();
        return id;
      } catch (e) {
        browser.error(e);
        return null;
      }
    case "setId":
      try {
        await setId(message.id);
      } catch (e) {
        browser.error(e);
      }
      break;
    default:
      console.log("unknown message type: " + message.type);
  }
}

async function getId(): Promise<string> {
  const id = await browser.storage.sync.get("id");
  return id.id;
}

async function setId(id: string) {
  browser.storage.sync.set({ id: id });
}

class Message {
  type: string = "";
  id: string = "";
}
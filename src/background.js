browser.runtime.onMessage.addListener(processMessage);

async function processMessage(message) {
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

async function getId() {
  const id = await browser.storage.sync.get("id");
  return id.id;
}

async function setId(id) {
  browser.storage.sync.set({ id: id });
}

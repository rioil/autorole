import { StorageUtil } from "./storageUtil";

init();

async function init() {
  const id = await StorageUtil.getId();
  const idField = document.querySelector<HTMLInputElement>("input[id='id']");
  if (idField && id) {
    idField.value = id;
  }

  const isSelectFirst = await StorageUtil.getIsSelectFirst();
  const isSelectFirstCheckbox = document.querySelector<HTMLInputElement>(
    "input[id='selectFirst']"
  );
  if (isSelectFirstCheckbox) {
    isSelectFirstCheckbox.checked = isSelectFirst;
  }

  const saveButton =
    document.querySelector<HTMLButtonElement>("button[id='save']");
  if (saveButton) {
    saveButton.addEventListener("click", save);
  }

  async function save() {
    if (idField) {
      await StorageUtil.setId(idField.value);
    }
    if (isSelectFirstCheckbox) {
      await StorageUtil.setIsSelectFirst(isSelectFirstCheckbox.checked);
    }
  }
}

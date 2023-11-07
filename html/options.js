"use strict";

init();

async function init() {
  const id = await getId();
  console.log(id);

  const idField = document.querySelector("input[id='id']");
  if (idField === null) {
    console.log("idField not found.");
  } else {
    idField.value = id;
  }

  const isSelectFirst = await getIsSelectFirst();
  console.log(isSelectFirst);

  const isSelectFirstCheckbox = document.querySelector(
    "input[id='selectFirst']"
  );
  if (isSelectFirstCheckbox === null) {
    console.log("isSelectFirstCheckbox not found.");
  } else {
    isSelectFirstCheckbox.checked = isSelectFirst;
  }

  const saveButton = document.querySelector("button[id='save']");
  if (saveButton === null) {
    console.log("saveButton not found.");
  } else {
    saveButton.addEventListener("click", save);
  }

  async function save() {
    await setId(idField.value);
    await setIsSelectFirst(isSelectFirstCheckbox.checked);
  }
}

async function getId() {
  const id = await browser.storage.sync.get("id");
  return id.id;
}

async function setId(id) {
  browser.storage.sync.set({ id: id });
}

async function getIsSelectFirst() {
  const isSelectFirst = await browser.storage.sync.get("isSelectFirst");
  return isSelectFirst.isSelectFirst;
}

async function setIsSelectFirst(isSelectFirst) {
  browser.storage.sync.set({ isSelectFirst: isSelectFirst });
}

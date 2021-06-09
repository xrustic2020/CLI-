import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath);
    console.table(JSON.parse(list));;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const list = await fs.readFile(contactsPath);
    const contactById = JSON.parse(list).find(
      (el) => el.id.toString() === contactId
    );

    console.table(contactById);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const list = await fs.readFile(contactsPath);
    const filteredList = JSON.parse(list).filter(
      (el) => el.id.toString() !== contactId
    );

    const updateList = JSON.stringify(filteredList);
    await fs.writeFile(contactsPath, updateList);

    console.log("Contact successful removed! Update list:");
    console.table(JSON.parse(updateList));
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4().slice(30),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath);
    const allCcontacts = JSON.parse(data);
    const newList = [...allCcontacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newList));

    console.log("Contact successful added:");
    console.table(newContact);
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const selectedContact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!selectedContact) {
    return null;
  }

  return selectedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const ind = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );

  if (ind === -1) {
    return null;
  }
  const deletedContact = contacts.splice(ind, 1)[0];

  const data = JSON.stringify(contacts, null, 2);

  await fs.writeFile(contactsPath, data);

  return deletedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const ids = contacts.map((contact) => Number(contact.id));
  const id = (Math.max.apply(null, ids) + 1).toString();
  const contact = { id, name, email, phone };
  contacts.push(contact);
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data);

  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await removeContact(contactId);

  if (contact) {
    const contacts = await listContacts();

    const { name, email, phone } = body;

    if (name) {
      contact.name = name;
    }
    if (email) {
      contact.email = email;
    }
    if (phone) {
      contact.phone = phone;
    }

    contacts.push(contact);

    const data = JSON.stringify(contacts, null, 2);

    await fs.writeFile(contactsPath, data);
  }

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

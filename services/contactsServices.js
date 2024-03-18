import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getOneContact = async (id) => {
    const contacts = await getAllContacts();
    return contacts.find((contact) => contact.id === id) || null;
};

const deleteContact = async (id) => {
    const contacts = await getAllContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) {
        return null;
    }

    const [deletedContact] = contacts.splice(contactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
};

const createContact = async (data) => {
    const contacts = await getAllContacts();

    const newContact = {
        id: nanoid(),
        ...data,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
};

const updateContact = async (id, data) => {
    const contacts = await getAllContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) {
        return null;
    }

    contacts[contactIndex] = {...contacts[contactIndex], ...data}

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[contactIndex]
};

export default {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
};

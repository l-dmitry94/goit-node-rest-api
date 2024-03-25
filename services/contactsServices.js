import Contact from "../models/Contact.js";

const getAllContacts = () => Contact.find();

const getOneContact = (id) => Contact.findById(id);

const deleteContact = (id) => Contact.findByIdAndDelete(id);

const createContact = (data) => Contact.create(data);

const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data);

const updateStatusContact = async (id, data) => Contact.findByIdAndUpdate(id, data);

export default {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateStatusContact,
};

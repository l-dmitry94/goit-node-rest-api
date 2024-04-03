import Contact from "../models/Contact.js";

const getAllContacts = (filter = {}, setting = {}) =>
    Contact.find(filter, "-createdAt -updatedAt", setting).populate("owner", "email");

const countContacts = filter => Contact.countDocuments(filter)

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
    countContacts
};

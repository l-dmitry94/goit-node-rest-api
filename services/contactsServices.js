import Contact from "../models/Contact.js";

const getAllContacts = (filter = {}, setting = {}) =>
    Contact.find(filter, "-createdAt -updatedAt", setting).populate("owner", "email");

const countContacts = filter => Contact.countDocuments(filter)

const getOneContactByFilter = (filter) => Contact.findOne(filter);

const deleteContactByFilter = (filter) => Contact.findOneAndDelete(filter);

const createContact = (data) => Contact.create(data);

const updateContactByFilter = (filter, data) => Contact.findOneAndUpdate(filter, data);

const updateStatusContact = async (id, data) => Contact.findByIdAndUpdate(id, data);

export default {
    getAllContacts,
    getOneContactByFilter,
    deleteContactByFilter,
    createContact,
    updateContactByFilter,
    updateStatusContact,
    countContacts
};

import HttpError from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
    try {
        const listContacts = await contactsService.getAllContacts();
        res.status(200).json(listContacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getContactById = await contactsService.getOneContact(id);
        if (!getContactById) {
            throw HttpError(404);
        }
        res.status(200).json(getContactById);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const removeContact = await contactsService.deleteContact(id);
        if (!removeContact) {
            throw HttpError(404);
        }
        res.status(200).json(removeContact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { error } = createContactSchema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message);
        }

        const addContact = await contactsService.createContact(req.body);
        res.status(201).json(addContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { error, value } = updateContactSchema.validate(req.body);

        if (Object.keys(value).length === 0) {
            throw HttpError(400, "Body must have at least one field");
        }

        if (error) {
            throw HttpError(400, error.message);
        }

        const { id } = req.params;

        const updateContact = await contactsService.updateContact(id, req.body);

        if (!updateContact) {
            throw HttpError(404);
        }

        res.status(200).json(updateContact);
    } catch (error) {
        next(error);
    }
};

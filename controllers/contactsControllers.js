import HttpError from "../helpers/HttpError.js";
import {
    createContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const skip = (page - 1) * limit;
        const { _id: owner } = req.user;
        const listContacts = await contactsService.getAllContacts(
            { owner },
            { skip, limit }
        );
        const total = await contactsService.countContacts({ owner });
        res.status(200).json({
            listContacts,
            total,
        });
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const getContactById = await contactsService.getOneContactByFilter({
            owner,
            _id: id,
        });
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
        const { _id: owner } = req.user;
        const removeContact = await contactsService.deleteContactByFilter({
            owner,
            _id: id,
        });
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
        const { _id: owner } = req.user;
        const { error } = createContactSchema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message);
        }

        const addContact = await contactsService.createContact({
            ...req.body,
            owner,
        });
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

        const { _id: owner } = req.user;
        const { id } = req.params;

        const updateContact = await contactsService.updateContactByFilter(
            { owner, _id: id },
            req.body
        );

        if (!updateContact) {
            throw HttpError(404);
        }

        res.status(200).json(updateContact);
    } catch (error) {
        next(error);
    }
};

export const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { error } = updateStatusContactSchema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message);
        }

        const updateContact = await contactsService.updateStatusContact(
            contactId,
            req.body
        );

        if (!updateContact) {
            throw HttpError(404);
        }

        res.status(200).json(updateContact);
    } catch (error) {
        next(error);
    }
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import authServices from "../services/authServices.js";
import "dotenv/config.js";

const { SECRET_KEY } = process.env;

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authServices.findUser({ email });

        if (user) {
            throw HttpError(409, "Email in use");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await authServices.signup({
            ...req.body,
            password: hashPassword,
        });

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await authServices.findUser({ email });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            throw HttpError(401, "Email or password is wrong");
        }

        const { _id: id } = user;

        const payload = {
            id,
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

        await authServices.updateUser({ _id: id }, { token });

        res.status(200).json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getCurrent = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;

        res.status(200).json({
            email,
            subscription
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;

        await authServices.updateUser({ _id }, { token: "" });

        res.status(204).json({
            Status: "204 No Content",
        });
    } catch (error) {
        next(error);
    }
};

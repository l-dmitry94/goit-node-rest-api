import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import authServices from "../services/authServices.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(HttpError(401, "Authorization header not found"));
    }
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        return res.status(401).kson({
            Status: "401 Unauthorized",
            "Content-Type": "application/json",
            ResponseBody: {
                message: "Not authorized",
            },
        });
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await authServices.findUser({ _id: id });

        if (!user) {
            return res.status(401).kson({
                Status: "401 Unauthorized",
                "Content-Type": "application/json",
                ResponseBody: {
                    message: "Not authorized",
                },
            });
        }

        if (!user.token) {
            return res.status(401).kson({
                Status: "401 Unauthorized",
                "Content-Type": "application/json",
                ResponseBody: {
                    message: "Not authorized",
                },
            });
        }

        req.user = user;

        next();
    } catch (error) {
        next(401, error.message);
    }
};

export default authenticate;

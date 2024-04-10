import express from "express";
import { signup, signin, getCurrent, logout, updateAvatar } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../schemas/userSchema.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRoute = express.Router();

authRoute.post("/register", validateBody(userSignupSchema), signup);

authRoute.post("/login", validateBody(userSigninSchema), signin);

authRoute.get("/current", authenticate, getCurrent);

authRoute.post("/logout", authenticate, logout);

authRoute.patch("/avatars", upload.single("avatar"), authenticate, updateAvatar)

export default authRoute;

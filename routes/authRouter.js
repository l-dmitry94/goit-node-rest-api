import express from "express";
import { signup, signin, getCurrent, logout } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../schemas/userSchema.js";
import authenticate from "../middlewares/authenticate.js"

const authRoute = express.Router();

authRoute.post("/register", validateBody(userSignupSchema), signup);

authRoute.post("/login", validateBody(userSigninSchema), signin);

authRoute.get("/current", authenticate, getCurrent);

authRoute.post("/logout", authenticate, logout)

export default authRoute;

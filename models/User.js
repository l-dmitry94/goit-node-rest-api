import { Schema, model } from "mongoose";
import { handleServerError, setUpdateSettings } from "./hooks.js";
import { emailRegex, subscriptionList } from "../constants/userConstants.js";

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: emailRegex,
        },
        subscription: {
            type: String,
            enum: subscriptionList,
            default: "starter",
        },
        avatarURL: {
            type: String,
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleServerError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleServerError);

const User = model("user", userSchema);
export default User;

import User from "../models/User.js";

const findUser = (filter) => User.findOne(filter);

const signup = (data) => User.create(data);

const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

const updateAvatar = (filter, data) => User.findOneAndUpdate(filter, data)

export default {
    signup,
    findUser,
    updateUser,
    updateAvatar
};

import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function UsersDao() {
    // let { users } = db;
    const createUser = (user) => {
        const newUser = { ...user, _id: uuidv4() };
        return model.create(newUser);

        // const newUser = { ...user, _id: uuidv4() };
        // // users = [...users, newUser];
        // users.push(newUser);
        // console.log("new created user " + JSON.stringify(users)); 
        // return newUser;
    };
    const findUsersByPartialName = (partialName) => {
        const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
        return model.find({
            $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
        });
    };

    // const findAllUsers = () => users;
    const findAllUsers = async () => await model.find();
    // const findUserById = (userId) => users.find((user) => user._id === userId);
    const findUserById = (userId) => model.findById(userId)
    // const findUserByUsername = (username) => users.find((user) => user.username === username);
    const findUserByUsername = async (username) => {
        const foundUser = await model.findOne({ username: username })
        console.log("Matched user by username:", foundUser);
    };
    const findUsersByRole = (role) => model.find({ role: role });
    // const findUserByCredentials = (username, password) =>
    //     users.find((user) => user.username === username && user.password === password);
    const findUserByCredentials = async (username, password) => {
        const foundUser = await model.findOne({ username, password })
        console.log("Matched user by creds:", foundUser);
        return foundUser;
    };
    // const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
    const updateUser = async (userId, user) => await model.updateOne({ _id: userId }, { $set: user });
    // const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
    //const deleteUser = async (userId) => await model.deleteOne({ _id: userId });

    const deleteUser = async (userId) => await model.findByIdAndDelete(userId);

    return {
        createUser,
        findAllUsers,
        findUserById,
        findUserByUsername,
        findUserByCredentials,
        updateUser,
        deleteUser,
        findUsersByRole,
        findUsersByPartialName
    };
}


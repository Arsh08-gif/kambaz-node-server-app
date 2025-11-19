import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
    let { users } = db;
    const createUser = (user) => {
        const newUser = { ...user, _id: uuidv4() };
        // users = [...users, newUser];
        users.push(newUser);
        console.log("new created user " + JSON.stringify(users)); 
        return newUser;
    };
    const findAllUsers = () => users;
    const findUserById = (userId) => users.find((user) => user._id === userId);
    // const findUserByUsername = (username) => users.find((user) => user.username === username);
    const findUserByUsername = (username) => {
        const user = users.find((user) => {
            return user.username === username;
        });

        console.log("Matched user by username:", user);
        return user;
    };
    // const findUserByCredentials = (username, password) =>
    //     users.find((user) => user.username === username && user.password === password);
    const findUserByCredentials = (username, password) => {
        const found = users.find((user) => {
            return user.username === username && user.password === password;
        });
        console.log("Matched user by creds:", found);
        return found;
    };
    const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
    const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
    return {
        createUser, findAllUsers, findUserById, findUserByUsername, findUserByCredentials, updateUser, deleteUser
    };
}


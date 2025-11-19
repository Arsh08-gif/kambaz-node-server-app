console.log("Inside user router");

import UsersDao from "./dao.js";
//let currentUser = null;
export default function UserRoutes(app, db) {
    console.log("database inside userRoutes " + JSON.stringify(db.users));

    const dao = UsersDao(db);
    const createUser = (req, res) => { };
    const deleteUser = (req, res) => { };
    const findAllUsers = (req, res) => { };
    const findUserById = (req, res) => { };
    const updateUser = (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        const currentUser = dao.findUserById(userId);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    const signup = (req, res) => {
        const { username, password } = req.body;
        if (!username || username.trim() === "") {
            return res.status(400).json({ message: "Username is required" });
        }

        if (!password || password.trim() === "") {
            return res.status(400).json({ message: "Password is required" });
        }
        const user = dao.findUserByUsername(req.body.username);
        console.log("sigup user : " + JSON.stringify(user));
        if (user) {
            res.status(400).json(
                { message: "Username already in use" });
            return;
        }
        const currentUser = dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);

    };
    const signin = (req, res) => {
        const { username, password } = req.body;
        console.log("sign-in username " + username);
        console.log("sign-in password " + password);
        const currentUser = dao.findUserByCredentials(username, password);
        console.log("signin user " + currentUser);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
        // if (currentUser) {
        //     req.session["currentUser"] = currentUser;
        //     res.json(currentUser);
        // } else {
        //     res.status(401).json({ message: "Unable to login. Try again later." });
        // }

    };
    const signout = (req, res) => {
        //currentUser = null;
        req.session.destroy();
        res.sendStatus(200);
    };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        console.log("current user " + currentUser);

        res.json(currentUser);
    };

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}


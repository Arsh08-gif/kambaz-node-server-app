import express from 'express';
import UserRoutes from "../kanbaz-next-js/app/(Kambaz)/Users/routes.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "../kanbaz-next-js/app/(Kambaz)/Database/index.js";
import CourseRoutes from "../kanbaz-next-js/app/(Kambaz)/Courses/routes.js"
import ModulesRoutes from "../kanbaz-next-js/app/(Kambaz)/Courses/[cid]/Modules/routes.js"
import AssignementRoutes from "../kanbaz-next-js/app/(Kambaz)/Courses/[cid]/Assignments/routes.js"
import "dotenv/config";
import session from "express-session";


const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3003",
}
));
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));

app.use(express.json());

// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {
//   res.send('Welcome to Full Stack Development!')})
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app,db)
AssignementRoutes(app,db)
Lab5(app);
// Hello(app)
app.listen(process.env.PORT || 4000)


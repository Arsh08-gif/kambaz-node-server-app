import express from 'express';
import UserRoutes from "./Users/routes.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Database/index.js";
import CourseRoutes from "./Courses/routes.js"
import ModulesRoutes from "./Modules/routes.js"
import AssignementRoutes from "./Assignments/routes.js"
import "dotenv/config";
import session from "express-session";


const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3001",
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

app.get('/hello', (req, res) => {res.send('Life is good!')})
app.get('/', (req, res) => {
  res.send('Welcome to Full Stack Development!')})
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app,db)
AssignementRoutes(app,db)
Lab5(app);
// Hello(app)
app.listen(process.env.PORT || 4000)


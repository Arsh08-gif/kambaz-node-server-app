import express from 'express';
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Database/index.js";
import CourseRoutes from "./Courses/routes.js"
import ModulesRoutes from "./Modules/routes.js"
import AssignementRoutes from "./Assignments/routes.js"
import "dotenv/config";
import session from "express-session";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://localhost:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const app = express()
app.use(cors({
    credentials: true,
    //origin: process.env.CLIENT_URL || "http://localhost:3001",
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            process.env.CLIENT_URL,
            'http://localhost:3001',
        ];
        
        // Check if the origin starts with any allowed origin (handles query params)
        const isAllowed = allowedOrigins.some(allowedOrigin => 
            origin.startsWith(allowedOrigin)
        );
        
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
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


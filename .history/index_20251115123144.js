import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

const app = express()
    // app.get('/hello', (req, res) => {res.send('Life is good!')})
    // app.get('/', (req, res) => {
    //   res.send('Welcome to Full Stack Development!')})
Hello(app)
app.listen(4001)


import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoute from './routes/todos.js';
//const bodyParser = require('body-parser');
//import bodyParser from "body-parser";

const app = express();
//app.use(bodyParser.json());

app.use(express.json());

app.use(cors());


app.get('/', (request, response) => {
    // console.log(request)
    return response.status(234).send('Welcome to Backend of To-Do List');
});

app.use('/api/todos', todoRoute);

mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

import express from "express";
import {ErrorMessage, NotFoundError} from '@istiyakriyad/common';
import routes from './routes';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}))



app.use('/api/v1/auth', routes);


app.get("/ping", (req, res, next) => {
    return res.json({message: "Auth Service"});
});


// Not found handle
app.use((req, res, next) => {
    next(new NotFoundError());
});

// Handle all error
app.use(ErrorMessage);

export {app};
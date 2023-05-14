import express from "express";
import {ErrorMessage, NotFoundError} from '@istiyakriyad/common';



const app = express();

app.use(express.json());


app.use("/", (req, res, next) => {
    return res.json({message: "Hello World"});
});

// Not found handle
app.use((req, res, next) => {
    next(new NotFoundError());
});

// Handle all error
app.use(ErrorMessage);

export {app};
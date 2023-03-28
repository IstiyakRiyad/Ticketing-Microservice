import express from "express";

const {
    PORT = 5000
} = process.env;

const app = express();


app.use("/", (req, res, next) => {
    return res.json({message: "Hello World"});
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise;
const database = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Model = require('./model');

//API paths
app.get("/fetch", async (req, res) => {
    const allCards = await Model.find();
    return res.status(200).json(allCards);
});

app.post("/add", async (req, res) => {
    const data = new Model({
        id: req.body.id,
        title: req.body.title,
        date: req.body.date,
        image: req.body.image,
        tags: req.body.tags,
    });

    try {
        const dataToSave = await data.save();
        return res.status(201).json(dataToSave);
    }
    catch (error) {
        return res.status(400).json({message: error.message});
    }
});

app.delete("/remove/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Model.findByIdAndDelete(id);
        return res.status(200).json({ message: `Removed data with id ${id}` });
    }
    catch (error) {
        return res.status(400).json({message: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

//Mongo
database.once('connected', () => {
    console.log('Database Connected');
})
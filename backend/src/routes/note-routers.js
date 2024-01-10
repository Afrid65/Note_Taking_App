const express = require("express");

const Note = require("../models/note");

const auth = require("../middlewares/auth");

const router = new express.Router();

//Create Notes
router.post("/notes/create", auth, async (req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.user._id,
    });

    try {
        await note.save()
        res.status(201).send({
            note, message: "NOte Saved"
        })
    } catch (e) {
        res.status(500).send(e);
    }
});


//Get all Notes
router.get("/notes/get", auth, async (req, res) => {
    try {
        await req.user.populate("notes")

        res.status(200).send(req.user.notes)
    } catch (e) {
        res.status(500).send(e)
    }
});

//Get one note by id
router.get("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findById({ _id: req.params.id })
        if (!note) {
            return res.status(404).send()
        }
        res.send(note)
    } catch (e) {
        res.status(500), send(e);
    }
});

//delete one note
router.delete("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id })
        if (!note) {
            return res.status(404).send()
        }

        res.send({ message: "Note was deleted" })
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;
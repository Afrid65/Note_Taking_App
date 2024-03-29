const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
},
    {
        timestamps: true,
        toJSon: { virtuals: true },
    }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

const mongoose = require("mongoose");

const dbconnecturl = process.env.NOTES_MONGODB_URL;

mongoose.connect(dbconnecturl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
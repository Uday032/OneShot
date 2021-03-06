const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({

    name: {
        type: "string",
        required: true
    },
    yearfounded: {
        type: "number",
        required: true
    },
    city: {
        type: "string",
        required: true
    },
    state: {
        type: "string",
        required: true
    },
    country: {
        type: "string",
        required: true
    },
    no_of_students: {
        type: "number",
        required: true
    },
    courses: [String],
});

module.exports = College = mongoose.model("colleges", CollegeSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({

    name: {
        type: "string",
        required: true
    },
    batchyear: {
        type: "number",
        required: true
    },
    collegeid: {
        type: "string",
        required: true
    },
    skills: [String],
});

module.exports = Student = mongoose.model("students", StudentSchema);
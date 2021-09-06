const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required!",
        },
        email: {
            type: String,
            required: "Email is required!",
            unique: [true],
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "PLEASE_PROVIDE_EMAIL"],
        },
        password: {
            type: String,
            required: "Password is required!",
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("User", userSchema);

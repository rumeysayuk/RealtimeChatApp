const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "bu alan zorunludur"],
        },
        email: {
            type: String,
            required: [true, "bu alan zorunludur"],
            unique: [true],
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "PLEASE_PROVIDE_EMAIL"],
        },
        password: {
            type: String,
            required: [true, "bu alan zorunludur"],
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("User", userSchema);

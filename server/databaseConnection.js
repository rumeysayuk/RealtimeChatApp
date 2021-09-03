const mongoose = require("mongoose");
const databaseConnection = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => {
            console.log("mongodb connection successful");
        })
        .catch((err) => {
            console.error(err);
        });
}

module.exports = databaseConnection;

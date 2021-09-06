const express = require("express");
const app = express();
const errorHandlers = require("./handlers/errorHandlers");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require("cors")());

app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

module.exports = app;

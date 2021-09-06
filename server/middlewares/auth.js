const jwt = require("jwt-then")
module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) throw "Yetkiniz yok!";
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET);
        req.payload = payload;
        console.log(payload)
        next();
    } catch (err) {
        res.status(401).json({
            message: "Yetkiniz yok!",
        });
    };
};

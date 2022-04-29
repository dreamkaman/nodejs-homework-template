const express = require("express");

const router = express.Router();

const { authenticate } = require("../../middlewares");

// console.log(authenticate);

// router.get("/current", authenticate, async (req, res, next) => {
    router.get("/current", async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
    } catch (error) {
        next(error);
    }
})
module.exports = router;

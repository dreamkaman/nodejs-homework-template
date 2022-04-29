const express = require("express");

const router = express.Router();

const {authenticate} = require("../../middlewares");

// router.get("/current", async (req, res, next) => {
router.get("/current", authenticate, async (req, res, next) => {
    try {
        console.log(req.user);
    } catch (error) {

    }
});


module.exports = router;

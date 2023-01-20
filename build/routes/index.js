"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// To check if the API server is up and running
router.get('/status', (req, res) => {
    console.log(req.url);
    res.json({ message: 'Server is live!' });
});
exports.default = router;

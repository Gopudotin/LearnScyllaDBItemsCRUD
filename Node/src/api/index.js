const express = require('express');
const router = express.Router();
const itemsRouter = require('./items');

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to API"
    });
});

router.use('/items', itemsRouter);

module.exports = router;

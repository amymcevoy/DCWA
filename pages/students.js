const express = require('express');
const router = express.Router();

//Routes
router.get('/', (req, res) => {
    res.send("This is the Students page.");
});

module.exports = router;



const express = require('express');
const router = express.Router();


// @route       POST api/users
// @description Register users
// @access      Public
router.post('/', (req,res) => {
    res.send('Register a User');
});

module.exports = router;
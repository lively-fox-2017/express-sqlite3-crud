"use strict"

const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    // res.send('group neh')
    res.render('group')
});


module.exports = router

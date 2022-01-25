const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Contacts!');
})

router.get('/list', (req, res) => {
    res.send('This is List!')
})

module.exports = router;
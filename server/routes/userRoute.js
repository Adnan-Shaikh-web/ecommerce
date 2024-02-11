const express = require('express')
const { addUser } = require('../controller/userController')
const router = express.Router()

router.post('/', addUser);

module.exports = router;
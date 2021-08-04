const express = require('express');
const { verifyToken } = require('../Config/jwt');
const router = express.Router();

//controllers
const { login, getUser } = require('../controller/auth.controller');

router.post('/login', login);
router.get('/user/:id', verifyToken('all'), getUser);

module.exports = router;

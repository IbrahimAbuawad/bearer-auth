'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const users = require('./models/users-model')
const basicAuth = require('./middleware/basic.js');

router.post('/signup', createSignUp);
router.post('/signin', basicAuth, createSignIn);


async function createSignUp(req, res) {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new users(req.body);
        const record = await user.save(req.body);

        res.status(200).json(record);

    } catch (e) { res.status(403).send("Error Creating User"); }
}



async function createSignIn(req, res) {
res.status(200).send(req.header.user)
    
}

module.exports = router;
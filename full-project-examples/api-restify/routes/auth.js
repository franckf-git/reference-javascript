'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const registerValidation = require('../validation').registerValidation;
const loginValidation = require('../validation').loginValidation;

router.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.post('/register', async (req, res) => {
    //verification des champs
    const {
        error
    } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //rejet de l'enregistrement si l'adresse mail existe
    let emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).send('Email déjà utilisé');

    //hash du mot de passe pour ne pas le stocker en clair
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    //insertion en base
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        let savedUser = await user.save();
        res.send({
            user: user._id
        });
    } catch (error) {
        res.status(400).send(error);
    }
    /* alternative au try-catch
        user.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                 res.json({message: err});
            })
            */
});

router.post('/login', async (req, res) => {
    //verification des champs
    const {
        error
    } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //rejet de la connexion si l'adresse mail n'existe pas
    let emailExist = await User.findOne({
        email: req.body.email
    });
    if (!emailExist) return res.status(400).send('Email non enregistré');

    //verification du mot de passe
    try {
        let passtoValid = await User.findOne({
            email: req.body.email
        }).select('password')
        let validPass = await bcrypt.compare(req.body.password, passtoValid.password)
        if (!validPass) return res.status(400).send('Le mot de passe est incorrect');
    } catch (error) {
        res.status(400).send(error);
    }

    res.send('LOGIN');
});

module.exports = router;
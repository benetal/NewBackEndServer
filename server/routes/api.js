const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Favourit = require('../models/favourit')
const mongoose = require('mongoose');
const db = "mongodb+srv://datascience_user:user_datascience@datascience-i6kmi.mongodb.net/DataScience?retryWrites=true&w=majority";



mongoose.connect(db, err  => {
    if (err){
        console.error('Error!' + err);
    }else {
        console.log('Connected to mongoDB');
    }
});

function verifyToken(req, res, next){
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        res.status(401).send('Unauthorized request');

    }

    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

router.get('/', (req, res) => {
    res.send('From Api Route');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) =>{
        if (error) {
            console.log(error);
        }else {
            let payload = { subject: registeredUser._id};
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }
    })
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error);
        }
        else {
            if (!user) {
                res.status(401).send('Invalid email');
            }
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password');
            }
            else {
                let payload = {subject: user._id};
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        }
    })
});



router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        },    {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        },    {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        },    {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        },    {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        }
    ]
    res.json(events);


});router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        },    {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        },    {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        },    {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        },    {
            "_id": "1",
            "name": "Auto Expo",
            "descritpion": "lorem ipsum"
        }
    ]
    res.json(events);
});

router.post('/favouritList', (req, res) => {
    let favouritData = req.body;
    let favourit = new Favourit(favouritData);
    favourit.save((error, registeredMovie) => {
        if (error) {
            console.log(error);
        }else {
            res.status(200).send(registeredMovie);
            console.log(registeredMovie);
        }
    });
});

router.get('/favouritList', (req, res) => {
    let registeredMovie = [{title: String, id: Number, poster_path:String}]
    res.json(registeredMovie);
});


module.exports = router;

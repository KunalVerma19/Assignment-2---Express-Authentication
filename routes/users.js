const e = require('express');
var express = require('express');
var router = express.Router();
const { User } = require('../models/User');
var passport = require('passport');

router.get('/login', function (req, res, next) {
    res.render('dashboard/login', {message: req.flash('error')});
});

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.get('/register', function (req, res, next) {
    res.render('dashboard/register');
});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (errors.length > 0) {
        res.render('dashboard/register', {
            errors,
            name, email, password, password2,
        });
    }
    else {

        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('dashboard/register', {
                    errors,
                    name, email, password, password2,
                });
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                newUser.save()
                    .then(user => {
                        res.render('dashboard/register', {
                            successredirect: 'ok'
                        })
                    })
                    .catch(err => {console.log(err)});;
            }


        });
    }
});


module.exports = router;
const e = require('express');
var express = require('express');
var router = express.Router();
const projects = require("../public/data/projects");
const { Contact } = require('../models/Contact');
const { Projects } = require('../models/Projects');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home' });
});

router.get('/about', function (req, res, next) {
    res.render('about', { title: 'About us' });
});

router.get('/projects', function (req, res, next) {
    res.render('projects', { title: 'My Projects' });
});

router.get('/services', function (req, res, next) {
    res.render('services', { title: 'Services' });
});


router.get('/contact', function (req, res, next) {
    if (req.query.name) {

        res.render('contact', { title: 'Thank you', isform: true });
    } else {
        res.render('contact', { title: 'Contact', isform: false });
    }
});

function isAuthenticated(req, res, done) {
    if (req.user) {
        return done();
    }
    return res.redirect('/users/login')
}

router.post('/logout', function (req, res) {
    req.logOut();
    res.redirect('/users/login')
})

router.route('/update/:id')
  .get((req, res) => {
    const id = req.params.id;
    Contact.findById(id, (err, tasks) => {
      if (err) return res.send(500, err);
      res.render('dashboard/updateForm', { data: tasks })
    })
  })
        .post((req, res) => {
          const id = req.params.id;
          Contact.findByIdAndUpdate(id, {
            name: req.body.name,
            phone: req.body.Phone,
            email: req.body.email
          }).catch(err => console.log(err));
          res.redirect("/dashboard");
        });
    

router.get('/dashboard', isAuthenticated, function (req, res, next) {

    Contact.find({}, (err, tasks) => {
        res.render('dashboard/index', { contacts: tasks });
    })

})

router.post('/addcontact', function (req, res, next) {
    const { name, email, Phone } = req.body;

    const newContact = new Contact({
        name,
        email,
        phone: Phone,
    });
    newContact.save()
        .then(console.log("Contact saved"))
        .catch(err => console.log(err));
    res.redirect('/dashboard');

})

router.route("/delete/:id").get((req, res) => {
    const id = req.params.id;
    Contact.findByIdAndRemove(id, err => {
      if (err) return res.send(500, err);
      res.redirect("/dashboard");
    });
  });


module.exports = router;
//modules imported
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')

const apnaGharCollection = require('../src/db/database');
const propertyCollection = require('../src/db/property')

// const auth = require('../src/middleware/auth')

const router = express.Router();

// app.use(cookieParser());

router.get('/', (req, res) => {
    res.render('homePage')
});
router.get('/about', (req, res) => {
    res.render('about')
});

router.get('/addProperty', (req, res) => {
    res.render('addProperty')
});

router.get('/property-grid', (req, res) => {
    res.render('property-grid')
});

router.get('/property-single', (req, res) => {
    res.render('property-single')
});

router.get('/agents-grid', (req, res) => {
    res.render('agents-grid')
});

router.get('/contact', (req, res) => {
    res.render('contact')
});

// router.get('/property', (req, res) => {
//     res.render('property')
// })

router.get('/property', (req, res) => {
    propertyCollection.find({}, function (err, properties) {
        res.render('property', {
            propertyList: properties
        })
    })
})

// router.get('/property', (req, res) => {

//     propertyCollection.find({})
//         .then((x) => {
//             res.render('/property', { x })
//             console.log(x);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword')
});

router.post('/addproperty', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const propertytype = req.body.propertytype;
    const choice = req.body.choice;
    const area = req.body.area;
    // const room = req.body.room;
    // const bathroom = req.body.bathroom;
    const city = req.body.city;
    const state = req.body.state;
    const price = req.body.price;

    const properties = new propertyCollection({
        name: name,
        email: email,
        phone: phone,
        propertytype: propertytype,
        choice: choice,
        area: area,
        // room: room,
        // bathroom: bathroom,
        city: city,
        state: state,
        price: price,

    })

    properties.save()
        .then(() => {
            res.redirect('/property')
        })
        .catch((err) => {
            console.log(err);
        })
})


// router.post('/signup', async (req, res) => {

// const name = req.body.name;
// const email = req.body.email;
// const phone = req.body.phone;
// const password = req.body.password;
// const cpassword = req.body.cpassword;

//     const signup = new apnaGharCollection({
//         name: name,
//         email: email,
//         phone: phone,
//         password: password,
//         cpassword: cpassword
//     })

//     if (password != cpassword) {
//         res.send('Password did not matched!')
//     }

//     signup.save()
//         .then(() => {
//             console.log('Data inserted');
//             res.redirect('/');
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

router.post('/signup', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {

            const signup = new apnaGharCollection({

                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                cpassword: req.body.cpassword,

            })

            //password hashing
            const signupNew = await signup.save();
            res.redirect('/');

        }
        else {
            res.send("<h1> Password didn't matched </h1>")
        }
    }
    catch (err) {
        console.log(err);
    }
})


// router.post('/login', async (req, res) => {

//     apnaGharCollection.findOne({
//         email: req.body.email,
//         password: req.body.password
//     })
//         .then((user) => {
//             if (user) {
//                 if (user.password === req.body.password) {
//                     res.redirect('/')
//                     console.log('Logged in succesfully..!');
//                 }
//                 else {
//                     res.send('Wrong password')
//                 }
//             }
//             else {
//                 res.render('noemail')
//             }
//         })

// })


router.post('/login', async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await apnaGharCollection.findOne({ email: email });

        const ismatch = bcryptjs.compare(password, useremail.password)

        if (ismatch) {
            res.redirect('/');
        }
        else {
            res.send("Wrong password");
        }
    }
    catch (err) {
        res.send('Some error in login details')
        console.log(err);
    }

})
module.exports = router
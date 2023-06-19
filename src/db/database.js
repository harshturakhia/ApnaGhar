const mongoose = require('mongoose')
mongoose.set("strictQuery", true);

const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

mongoose.connect('mongodb://127.0.0.1:27017/apnaGharNew', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log(err);
    })

const property = require('./property')

const apnGharSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        // unique: true,
        minlength: 2,
        maxlength: 30,
    },

    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is inValid")
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 10,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 16,
    },
    cpassword: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 16,
    },
})

apnGharSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        console.log(`Current password : ${this.password}`);
        this.password = await bcryptjs.hash(this.password, 10);
        console.log(`Hash password : ${this.password}`);

        this.cpassword = undefined;
    }
    next();
})


const apnaGharCollection = new mongoose.model('apnaGharCollection', apnGharSchema);

module.exports = apnaGharCollection;

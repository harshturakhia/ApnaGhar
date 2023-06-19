const mongoose = require('mongoose')
mongoose.set("strictQuery", true);

const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const db = require('./database.js')

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },

    propertytype: {
        type: String,
        required: true,
    },

    choice: {
        type: String,
        required: true,
    },

    area: {
        type: Number,
        required: true,
    },

    // room: {
    //     type: Number,
    //     required: true,
    // },

    // bathroom: {
    //     type: Number,
    //     required: true,
    // },

    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    }

})

const propertyCollection = new mongoose.model('propertyCollection', propertySchema)

module.exports = propertyCollection;
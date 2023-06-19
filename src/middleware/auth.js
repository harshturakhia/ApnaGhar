const jwt = require('jsonwebtoken')
const apnaGharCollection = require('../db/database')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyUser);

        const user = apnaGharCollection.findOne({ _id: verifyUser._id })
        // console.log(user);
        next();

    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth
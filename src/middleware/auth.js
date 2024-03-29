const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({ _id: decoded._id, "tokens.token": token})

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

    } catch (e) {
        res.sendStatus(401)
    }
    next()
}

module.exports = auth
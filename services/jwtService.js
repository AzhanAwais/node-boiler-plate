
const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } = require("../config/index")

class JwtService {
    generateToken(user) {
        const { _id } = user
        const token = jwt.sign({ _id }, JWT_SECRET_KEY)
        return token
    }

    verifyToken(token) {
        const { _id } = jwt.verify(token, JWT_SECRET_KEY)
        console.log("=-=-=-", _id)
        return _id
    }

}

module.exports = new JwtService()
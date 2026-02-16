const jwt = require('jsonwebtoken')
async function identifyuser(req,res,next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not provided, unauthorised access"
        })
    }
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "User not authorized"
        })
    }
    req.user = decoded
    next()
}

module.exports = identifyuser

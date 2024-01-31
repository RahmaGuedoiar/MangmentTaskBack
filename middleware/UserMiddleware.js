const jwt = require('jsonwebtoken')
const userMiddelware = async (req, res, next) => {
  try {
    // tjini men front fi req.header
    const token = req.headers.token;
    if (!token) {
      res.status(400).json({ msg: "you are not autorized" })
    } else {
      //jwt.verify token et key
      jwt.verify(token, process.env.JWTTOKEN,(err,verifyToken)=>{
        if (err) {
          res.status(400).json({ msg: "you are not autorized" })
        } 
        else {
          req.body.userId = verifyToken.id
          next()
        }
      })
      
  } }catch (error) {
    res.status(500).json({ msg: "somthing went wrong" })
    console.log(error)
  }

}



module.exports = userMiddelware
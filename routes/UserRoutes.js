const express = require("express")
const router = express.Router()
const { Registre, Login,userData } = require('../Conrollers/UserControles')
const { check } = require('express-validator')
const userMiddelware=require('../middleware/UserMiddleware')
// fi chnowa ythbt , msg eli yrj"o  w9ta yatl3 8alt,le code ythbt bihom
router.post('/createUser', [check('email', 'Not a valide email ').isEmail().normalizeEmail(), check('password', 'password should contiaint...').isStrongPassword(
    {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10, pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10
    })], Registre)
router.post('/Login', Login)
router.get('/getData',userMiddelware,userData)

module.exports = router
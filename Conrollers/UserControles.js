const USER = require('../modles/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const Registre = async (req, res) => {
    
    try {
        // 5dm middellwer kne rj3t err trj3o fi validatResult
    // middelwer t3adi 7aja fi req bech y3rf eli 3ndo err
    const errors = validationResult(req)
    // isEmty methode t9olik kne far8 
    if (!errors.isEmpty()) {
        //.array  erroret yarj3o fi tableau 
        res.status(400).json({msg:errors.array()})
    }else{ 
        // a partir du front
        const { name, age, email, password } = req.body
        const existeUser = await USER.findOne({ email: email })

        //existeUser contient un object donc true c non false
        if (existeUser) {
            res.status(400).json({ msg: "User already existe plz login " })
        } else {
            // crypter le mot passe  hasage 
            // creation token (envoyer dans la partie move : id , sécrete key,time yo93ed fih token valable )
            //10 complexité 
            const hashpw = await bcrypt.hash(password, 10)
            const newUser = await USER.create({ name, age, email, password: hashpw })
            const token = await jwt.sign({id: newUser._id }, process.env.JWTTOKEN, { expiresIn: "7d" })
            res.status(201).json({ msg: "Resister Done!", token })
        }}
    }
    catch (error) {
        res.status(500).json({ msg: "somthing is wrong" })
        console.log(error)
    }
}


const Login = async (req, res) => {

    try {
        // a partir du front
        const { email, password } = req.body
        const existeUser = await USER.findOne({ email: email })

        if (!existeUser) {
            res.status(400).json({ msg: "Make sur to register first ! " })
        } else {
            // comparison de password eli da5lha wpassword mta3 egister 
            const verify = await bcrypt.compare(password, existeUser.password)
            if (!verify) {
                res.status(400).json({ msg: "wong password plz try again !" })
            } else {
                const token = await jwt.sign({id: existeUser._id }, process.env.JWTTOKEN, { expiresIn: "7d" })

                res.status(201).json({ msg: "login done ! ", token })
            }

        }
    } catch (error) {
        res.status(500).json({ msg: "somthing is wrong " })
        console.log(error)
    }

}
const userData=async(req,res)=>{
    try {
        // _id: fi document , userId : ba3thnaha fi middelwer usermidelwer
        const user= await USER.findOne({_id:req.body.userId})
        
        if(!user){
            res.status(400).json({msg:("user not existe ")})
        }else {
            res.status(200).json({msg:"Get user data !",user})
        }
    } catch (error) {
        res.status(500).json({ msg: "somthing is wrong " })
        console.log(error)
    }
}



module.exports = { Registre, Login, userData}
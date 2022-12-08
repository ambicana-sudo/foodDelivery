const express = require("express");
const User = require('../Model/usersSchema')
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    try{
        // console.log(req.body)
        const registeredUser = await User.findOne({email: req.body.email})
        hashPassword = registeredUser.password
        // console.log(hashPassword)

        // now compare hashed password
        bcrypt.compare(req.body.password, hashPassword).then(function(result) {
            console.log("result", result)
            
            if(result){
                const userToken = jwt.sign({ emial: req.body.email }, process.env.SECRET_TOKEN);
                // console.log(userToken)

                User.findOneAndUpdate({email: req.body.email}, {
                    $set: {
                        token: userToken
                    }
                }).then((data) => {  
                    // console.log(data)
                    res.json({
                        accessToken: data.token,
                        detail: registeredUser,
                        msg: `You're logged in`
                    })
                })
                
            }else{
                res.json({
                    message: "Invalid email or password"
                })
            }
        });
    }catch(error){
        console.log(error)
    }
});

// view users
router.get("/", async (req, res) => {

});

module.exports = router;

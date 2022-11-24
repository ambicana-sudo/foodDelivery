const express = require("express");
const User = require('../Model/usersSchema')
const router = express.Router();

router.post("/", async (req, res) => {
    try{
        console.log(req.body)
        const registeredUser = await User.findOne({email: req.body.email})
        hashPassword = registeredUser.password

        // now compare hashed password
        bcrypt.compare(req,body.password, hashPassword).then(function(result) {
            console.log(result)
            
            if(result){
                res.send({
                    detail: registeredUser,
                    message: `You're logged in`
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

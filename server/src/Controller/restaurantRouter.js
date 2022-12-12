const express = require("express");
const Restaurant = require('../Model/restaurantSchema')
const router = express.Router();
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')

// post request for register the user
router.post("/", upload, async (req, res) => {
    try{
        console.log(req.file)
        req.body.restroImage = req.file.filename
        const selectedRestro = Restaurant.create(req.body)
        console.log(req.body)
        res.json({
            message: 'Added your selected restaurant',
            restroDetail: selectedRestro
        })
    }catch(error){
        res.json({
            errorMsg: 'The restaurant not found',
            errDetail: error
        })
    }
});

// view users
router.get("/", async (req, res) => {
    try{
        const restaurantList = await Restaurant.find()
        res.json({
            restaurantList : restaurantList
        })
    }catch(error){
        console.log(error)
    }
});

module.exports = router;

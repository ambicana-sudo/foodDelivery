const express = require("express");
const Food = require('../Model/foodSchema')
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

// post request for food
router.post('/', upload, async(req, res)=>{
    try{
        // console.log(req.file)
        req.body.foodImage = req.file.filename

        // console.log(req.body)
        const addFood = Food.create(req.body)
        res.json({
            FoodDetail: addFood,
            message: "Added New Food"
        })
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
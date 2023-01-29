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

router.get('/:restaurant', async(req, res)=>{
    try{
        const foodList = await Food.find({restaurantName: req.params.restaurant})
        console.log(foodList)
        res.json({
            foodList: foodList
        })
    }catch(error){
        console.log(error)
    }
})

router.put('/', async(req, res)=>{
    try{
        // req.body.foodImage = req.file?.filename || ''
        const updateFoodData = await Food.updateOne({_id: req.body._id}, {$set: req.body})
        res.json({
            message: "updated data",
            updatedItem: updateFoodData
        })
    }catch(error){
        console.log(error)
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        const deleteFoodData = await Food.deleteOne({_id: req.params.id})
        res.json({
            message: "food deleted",
            removededItem: deleteFoodData
        })
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
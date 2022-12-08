const express = require("express");
const Food = require('../Model/foodSchema')
const router = express.Router();

// post request for food
router.post('/', async(req, res)=>{
    try{
        console.log(req.body)
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
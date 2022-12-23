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
        console.log('filer', req.file)
        req.body.restroImage = req.file.filename

        const selectedRestro = Restaurant.create(req.body)
        console.log(req.body)
        res.json({
            message: 'Added your selected restaurant',
            restroDetail: selectedRestro
        })
    }catch(error){
        console.log(error)
        res.json({
            errorMsg: 'failed to register restro'
        })
    }
});

// get restaurasnt list
router.get("/", async (req, res) => {
    try{
        console.log('query', req.query)
        var regexp = new RegExp("^"+ req.query.name);
        let restaurantList;
        
        if(req.query.name){
            restaurantList = await Restaurant.find({name: regexp})
        }else{
            restaurantList = await Restaurant.find()
        }

        res.json({
            restaurantList : restaurantList
        })
        
    }catch(error){
        console.log(error)
    }
});

// update restaurasnt data
router.put("/", async(req, res)=>{
    try{
        // console.log(req.file)
        // req.body.restroImage = req.file.filename || ''

        const updateRestroData = await Restaurant.updateOne({_id: req.body._id}, {$set: req.body})
        res.send({
            message: 'updated the data',
            updatedItem: updateRestroData
        })
    }catch(error){
        console.log(error)
    }
})

// delete restaurant
router.delete("/:id", async(req, res)=>{
    try{
        console.log('id',req.params.id)
        const deleteRestro = await Restaurant.deleteOne({_id: req.params.id})
        res.send(deleteRestro)
    }catch(error){
        console.log(error)
    }
})

// delete restaurant
router.get("/:id", async(req, res)=>{
    try{
        // console.log('id',req.params.id)
        const restroDetail = await Restaurant.findById({_id: req.params.id})
        if(restroDetail){
            res.send(restroDetail)
        }else{
            res.json({
                msg: 'Restro details not found'
            })
        }
    }catch(error){
        console.log(error)
    }
})

module.exports = router;

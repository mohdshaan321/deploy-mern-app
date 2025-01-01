const ensureAuthenticated = require('../Controllers/Auth')

const router = require("express").Router()

router.get("/",(req,res)=>{

    res.status(200)
    .json(
     [
        {
        name : "Mobile",
        price: 40000,
        },

        {
        name : "tv",
        price: 5000000,
        },

        {
        name : "bike",
        price: 12000,
        }

])
     
})

module.exports = router;
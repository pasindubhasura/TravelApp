//importing dependencies
const router = require('express').Router();
const Guide = require('../models/guide');



//Insert guide deatils 
router.post('/guide/add',(req,res)=>{

    let newGuide = new Guide(req.body);

    newGuide.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Guide created Successfully!"
        });

        });
});


module.exports = router;

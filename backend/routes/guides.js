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

//get Guides details 
router.get('/guides',(req,res)=>{
    Guide.find().exec((err,guides)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingGuide: guides
        });
    }) ;          
});


//update guide deatils
router.put('/guide/update/:id',(req,res)=>{
    Guide.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,guide)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

module.exports = router;

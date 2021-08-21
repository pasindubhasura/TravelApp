//importing dependencies
const router = require('express').Router();
const Guide = require('../models/guide');
const imgbbUploader = require("imgbb-uploader")



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

//get Individuale Gide deatils
router.get("/guide/:id",(req,res)=>{
    let gId = req.params.id;
    Guide.findById(gId,(err,guide)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            guide
        });
    });
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

//delete guide

router.delete('/guide/delete/:id',(req,res)=>{
    Guide.findByIdAndRemove(req.params.id).exec((err,deleteGuide)=>{
        if (err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete Successful",deleteGuide
        });

    });
});

//image handling
// router.post("/guide/upload", async (req, res) => {
//     const path = req.body.path;
  
//     const options = {
//       apiKey: "b9873515ab55dff911b045133a42e546",
//       base64string: path,
//     };
//     const response = await imgbbUploader(options);
  
//     console.log(response.image.url);
//     res.json({ imgUrl: response.image.url });
//   });

module.exports = router;

const mongoose = require('mongoose');

const accommodationScheema = new mongoose.Schema({

    accommodationType:{
        type: String,
        require: true,
    },
    name:{
        type: String,
        require:true,
    },
    noOfRomm:{
        type: Number,
        require:true,
    },
    image:{
        type:String,
        require:true
    },
},{
    timestamps: true,
})


//export Accomdation model for router usage
module.exports = mongoose.model("accommodation", accommodationScheema);
const mongoose = require('mongoose');

const accommodationScheema = new mongoose.Schema({

    accommodationId: {
        type: String,
        require: true,
        unique: true
    },    
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
    mobile:{
        type: Number,
        require:true
    },
    accImage:{
        type: String,
        require: true
    }
},{
    timestamps: true,
})


//export Accomdation model for router usage
module.exports = mongoose.model("accommodation", accommodationScheema);
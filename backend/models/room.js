const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({

    accName:{
        type: String,
        require:true
    },
    roomNo:{
        type: Number,
        require:true
    },
    noOfBeds:{
        type: Number,
        require:true
    },
    airCondition:{
        type: String,
        require:true
    },
    price:{
        type: Number,
        require:true
    },
    description:{
        type: String,
        requre: true
    },
    availability:{ 
        type: String,
        default: "Available",
        require:true
    },
    image:{
        type: String,
        require:true
    }
},{
    timestamps: true,
}) 


module.exports = mongoose.model('room',roomSchema);
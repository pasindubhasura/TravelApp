//importing dependencies
const mongoose = require('mongoose');

//create schema with variables 
const guideSchema = new mongoose.Schema({

    registrationNo:{
        type:String,
        require: true
    },
    name:{
        type:String,
        require: true
    },
    address:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    phoneNo:{
        type: Number,
        required : true
    },
    language:{
        type:String,
        default: 'English',
        require: true
        
    }, 
    availability:{
        type:String,
        default: 'Available',
        require: true
    }
    

});


module.exports =  mongoose.model('Guide',guideSchema);
//import router express and models
const router = require("express").Router();
const room = require("../models/room");
const Room = require("../models/room");



/*******************     Insert data to database     ******************/

http://localhost:8070/room/add

router.post(`/room/add`,(req, res) => {

    //create room type object
    let newRoom = new Room(req.body);

    newRoom.save((err) => {

        if(err){
            return res.status(400).json({ 
                error: err 
            });
        }
            return res.status(200).json({
                success: "New Room Add"
        });
    });
});

/**************************************************************/


/**********************     Retreive Data    *********************/

http://localhost:8070/room/

router.get('/room/',(req, res) => {

    Room.find().exec((err, rooms) => {

        if(err){
            return res.status(400).json({
                error: err
            });
        }
            return res.status(200).json({
                success: true,
                existingRooms: rooms
            });
    });
});

/****************************************************************/



/*********************      Update Data     *********************/

http://localhost:8070/room/update/ _id

router.put('/room/update/:id',(req, res) => {

    Room.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, room) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: "Update successful"
            });
        }
    );
});

/****************************************************************/



/*********************     Delete Data     **********************/

http://localhost:8070/room/delete/ _id

router.delete('/room/delete/:id',(req, res) => {

    Room.findByIdAndDelete(req.params.id)
        .exec((err, deleteRoom) => {
            if(err){
                return res.status(400).json({
                    message: "Delete unsucess !", err
                });
            }
            return res.status(200).json({
                message: "Delete success", deleteRoom
            });
        });
});

/****************************************************************/



/*********************     Search by Id     *******************/

http://localhost:8070/room/ _id

router.get('/room/:id',(req, res) => {

    let roomNo = req.params.id;

    Room.findById(roomNo,(err,room) => {

        if(err){
            return res.status(400).json({
                success: false, err
            });
        }
        return res.status(200).json({
            success: true,
            room
        });
    });
});


/**************************************************************/
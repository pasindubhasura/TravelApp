//import router express and models
const router = require("express").Router();
const Accommodation = require("../models/accommodation");


/*******************     Insert data to database     ******************/

http://localhost:5000/accommodation/add

router.post(`/accommodation/add`, (req, res) => {

    //create accomdation type obejct
    let newAccommodation = new Accommodation(req.body);

    newAccommodation.save((err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json({
            success: "New accommodation saved success"
        });
    });
});

/**************************************************************/


/************************     Retreive Data     ***********************/

http://localhost:5000/accommodation/

router.get('/accommodation/', (req, res) => {

    Accommodation.find().exec((err, accommodations) => {

        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            existingAccommodations: accommodations
        });
    });
});

/**************************************************************/


/************************      Update Data     ***********************/

http://localhost:5000/accommodation/update/ _id

router.put('/accommodation/update/:id', (req, res) => {

    Accommodation.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, accommodation) => {

            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json({
                success: "Update successful"
            });
        }
    );

});

/**************************************************************/




/*********************     Delete Data     **********************/

http://localhost:5000/accommodation/delete/_id

router.delete('/accommodation/delete/:id', (req, res) => {

    Accommodation.findByIdAndDelete(req.params.id)
        .exec((err, deleteAccommodation) => {
            if (err){
                return res.status(400).json({
                    message: "Delete Unsuccess", err
                });
            }
            return res.status(200).json({
                message: "Delete Success", deleteAccommodation
            });
        });
});

/***************************************************************/



/*********************     Search by Id     *******************/

router.get('/accommodation/:id',(req, res) => {

    let accNo = req.params.id;

    Accommodation.findById(accNo,(err,accommodation) => {

        if (err) {
            return res.status(400).json({
                success: false, err
            });
        }
        return res.status(200).json({
            success: true,
            accommodation
        });
    });
});

/**************************************************************/

//export accomdation module to the server
module.exports = router;
const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "addDestination": {
      return [
        body("destination")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Destination can't be empty."),
        body("city")
          .trim()
          .isLength({ min: 1 })
          .withMessage("City can't be empty."),
        body("description")
          .trim()
          .isLength({ min: 10, max: undefined })
          .withMessage("Description should at least have 10 characters."),
      ];
    }
    case "editDestination": {
      return [
        body("destination")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Destination can't be empty."),
        body("city")
          .trim()
          .isLength({ min: 1 })
          .withMessage("City can't be empty."),
        body("description")
          .trim()
          .isLength({ min: 10, max: undefined })
          .withMessage("Description should at least have 10 characters."),
      ];
    }
  }
};

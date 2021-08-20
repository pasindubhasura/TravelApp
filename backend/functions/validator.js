const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "addDestination": {
      return [
        body("destination")
          .trim()
          .isEmpty()
          .withMessage("Destination can't be empty."),
        body("city").trim().isEmpty().withMessage("City can't be empty."),
        body("province")
          .trim()
          .equals("none")
          .withMessage("A province should be selected."),
        body("district")
          .trim()
          .equals("none")
          .withMessage("A district should be selected."),
        body("description")
          .trim()
          .isEmpty()
          .withMessage("Description can't be empty.")
          .isLength({ min: 10, max: undefined })
          .withMessage("Description should at least have 10 characters."),
      ];
    }
    case "editDestination": {
      return [
        body("destination")
          .trim()
          .isEmpty()
          .withMessage("Destination can't be empty."),
        body("city").trim().isEmpty().withMessage("City can't be empty."),
        body("province")
          .trim()
          .equals("none")
          .withMessage("A province should be selected."),
        body("district")
          .trim()
          .equals("none")
          .withMessage("A district should be selected."),
        body("description")
          .trim()
          .isEmpty()
          .withMessage("Description can't be empty.")
          .isLength({ min: 10 })
          .withMessage("Description should at least have 10 characters."),
      ];
    }
  }
};

const Rectangle = require("../model/rectangle.js");



exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a rectangle
  const rectangle = new Rectangle({
    width: req.body.width,
    height: req.body.height,
    color: req.body.color
  });
	
  // Save rectangle in the database
  Rectangle.create_post(rectangle, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rectangle."
      });
    else res.redirect('/');
  });
};


exports.get = (req, res) => {
  Rectangle.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rectangles."
      });
    else res.render('index', {rectangles: data});
  });
};



exports.delete = (req, res) => {
   Rectangle.remove(req.body.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found rectangle with id ${req.body.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete rectangle with id " + req.body.id
        });
      }
    } else res.redirect('/');
  });
};





exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Rectangle.updateById(
    req.body.id,
    req.body.width,
    req.body.height,
    req.body.color,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rectangle with id ${req.body.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating rectangle with id " + req.body.id
          });
        }
      } else res.redirect('/');
    }
  );
};






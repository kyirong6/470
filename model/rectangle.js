const sql = require("../helper/db.js");

// constructor
const Rectangle = function(rectangle) {
  this.width = rectangle.width;
  this.height = rectangle.height;
  this.color = rectangle.color;
};

Rectangle.create_post = (newRectangle, result) => {
  w = newRectangle.width;
  h = newRectangle.height;
  c = newRectangle.color.substring(1);
  var action = "insert into Rectangle (width, height, color) values (?, ?, ?)";
  sql.query(action,[w,h,c], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created rectangle");

    result(null, res);
  });
};


Rectangle.getAll = result => {
  sql.query("SELECT * FROM Rectangle", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};



Rectangle.remove = (id, result) => {
  console.log(id);
  sql.query("DELETE FROM Rectangle WHERE id = ?",[id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted rectangle with id: ", id);
    result(null, res);
  });
};




Rectangle.updateById = (id, width, height, color, result) => {
  console.log(id);
  sql.query(
    "UPDATE Rectangle set width=?, height=?, color=?  WHERE id = ?;",
    [width, height, color.substring(1), id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found rectangle with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated rectangle: ", id);
      result(null, res);
    }
  );
};


module.exports = Rectangle;

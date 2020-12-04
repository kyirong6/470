const express = require('express');
const bodyParser = require("body-parser");
const rectangleRoutes = require('./routes/rectangleRoutes');

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.set('view engine', 'ejs');




app.get('/', function(req, res) {
    res.redirect('/rectangle');
});

// reactangle routes
app.use('/rectangle', rectangleRoutes);

app.listen(80);

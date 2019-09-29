require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const app = express();
const expressValidator = require("express-validator");
app.use(expressValidator());
const cors = require("cors");
const path = require("path");

const errorHandler = require("_helpers/error-handler");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieparser());
app.use(cors());

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./_helpers/passport')(passport);

// api routes
app.use('/', require('./routes/test'));
app.use('/user', require('./routes/user/user.route'));
app.use('/request', require('./routes/requests/request.route'));

//Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use(errorHandler);

module.exports = app;


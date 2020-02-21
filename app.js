var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trackRouter = require('./routes/track');

var app = express();

dotenv.config({ path: path.resolve(__dirname, '.env') });
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/resume', usersRouter);
app.use('/track', trackRouter);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnect');
const app = express();
const path = require('path');

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));


//----USERROUTE----//
var users = require('./users');
app.use('/users', users);

//----GROUPROUTE----//
var lists = require('./lists');
app.use('/lists', lists);

//----SEARCHROUTE----//
var search = require('./search');
app.use('/search', search);

//----TASKROUTE-----//
var tasks = require('./tasks');
app.use('/tasks', tasks);


app.listen(process.env.PORT || 3000, function (){
  console.log('server is running on port %d in %s mode', this.address().port, app.settings.env);
});

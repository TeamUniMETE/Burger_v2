const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnect');
const app = express();

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});


//----USERROUTE----//
var users = require('./users');
app.use('/users', users);

//----GROUPROUTE----//
var groups = require('./groups');
app.use('/groups', groups);


//-------------------------//
app.get('/', function(req, res) {

    res.send('ROOT');
});

app.get('/test', function(req, res) {

    var sql = 'SELECT * FROM users';

    db.any(sql).then(function(data) {

        res.status(200).json(data);

    }).catch(function(err) {

        res.status(500).json({err});
    });
});

app.listen(process.env.PORT || 3000, function (){
  console.log('server is running on port %d in %s mode', this.address().port, app.settings.env);
});

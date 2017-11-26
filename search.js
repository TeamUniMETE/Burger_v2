var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var db = require('./dbconnect');

var secret = "greatmindcomesgreatresponsibilty"; //used to create the token
var logindata;


router.use(function (req, res, next) {

    var token = req.query['token'];

    if (!token) {
        res.status(403).json({msg: "No token received"}); //send
        return; //quit
    }
    else {
        try {
          logindata = jwt.verify(token, secret); //check the token
        }
        catch(err) {
          res.status(403).json({msg: "The token is not valid!"}); //send
          return; //quit
        }
    }

    next();
});

router.get('/', function (req, res) {

    var upload = req.query.user;

    var sql = `PREPARE get_user(text) AS
            SELECT users.loginname FROM users WHERE users.loginname=$1;
            EXECUTE get_user('${upload}')`;

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE get_user");

    if (data.length <= 0) {
        res.status(403).json({msg: "User does not exists"}); //send
        return; //quit
    } else {

    console.log(data);
    res.status(200).json(data);

    }

    }).catch(function(err) {

        res.status(500).json({err});

    });

});

module.exports = router;

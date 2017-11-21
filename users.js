var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var db = require('./dbconnect');

var secret = "greatmindcomesgreatresponsibilty"; //used to create the token

// REGISTER
router.get('/', function(req, res) {
    res.send('you are at /users');
});

router.get('/test', function(req, res) {

    var sql = 'SELECT * FROM users';

    db.any(sql).then(function(data) {
        //send logininfo + token to the client
        res.status(200).json(data);

    }).catch(function(err) {

        res.status(500).json({err});

    });

});

router.get('/search', function(req, res) {

    var upload = {
        loginname: "admin"
    };

    var sql = `PREPARE get_user(text) AS
            SELECT users.loginname FROM users WHERE users.loginname LIKE '%'$1'%';
            EXECUTE get_user('${upload.loginname}')`;

    console.log(sql);

    db.any(sql).then(function(data) {
        console.log(data)
        res.status(200).json(data);

    }).catch(function(err) {

        res.status(500).json({err});

    });

});

router.post('/search', bodyParser, function (req, res) {

    var upload = JSON.parse(req.body);
    var search = upload.loginname;

    /*var sql = `PREPARE get_users AS
            SELECT * FROM users WHERE loginname LIKE '%%';
            EXECUTE get_users`;*/

    /*var sql = 'SELECT * FROM users WHERE loginname LIKE %' + search +'%;';
*/
var sql = `SELECT * FROM users WHERE loginname=$1;('${upload.loginname}')`;


    db.any(sql).then(function(data) {
        console.log(data)
        res.status(200).json(data);

    }).catch(function(err) {

        res.status(500).json({err});

    });

});

/*

router.post('/search', bodyParser, function(req, res) {

    var sql = `SELECT *
     FROM users WHERE loginname LIKE "%admin%"`;

    db.any(sql).then(function(data) {

        res.status(200).json(data);

    }).catch(function(err) {

        res.status(500).json({err});

    });
});
*/

router.post('/register', bodyParser, function (req, res) {

    var upload = JSON.parse(req.body);
    var encrPassw = bcrypt.hashSync(upload.password, 10); //hash the password

    var sql = `PREPARE insert_user (int, text, text, text) AS
                INSERT INTO users VALUES(DEFAULT, $2, $3, $4); EXECUTE insert_user
                (0, '${upload.loginname}', '${encrPassw}', '${upload.fullname}')`;


    db.any(sql).then(function(data) {

        db.any("DEALLOCATE insert_user");

        //create the token
        var payload = {loginname: upload.loginname, fullname: upload.fullname};
        var tok = jwt.sign(payload, secret, {expiresIn: "12h"});

        //send logininfo + token to the client
        res.status(200).json({loginname: upload.loginname, fullname: upload.fullname, token: tok});

    }).catch(function(err) {

        res.status(500).json({err});

    });
});

router.post('/auth/', bodyParser, function (req, res) {

    var upload = JSON.parse(req.body); //should be sanitized

    var sql = `PREPARE get_user (text) AS
                    SELECT * FROM users WHERE loginname=$1;
                    EXECUTE get_user('${upload.loginname}')`;


    console.log(sql);

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE get_user");

        //if wrong user or password -> quit
        if (data.length <= 0) {
            res.status(403).json({msg: "Login name does not exists"}); //send
            return; //quit
        } else {

            //check if the password is correct
            var psw = upload.password;
            var encPsw = data[0].password;
            var result = bcrypt.compareSync(psw, encPsw);

            if (!result) {
                res.status(403).json({msg: "Wrong password"}); //send
                return; //quit
            }
        }

        //we have a valid user -> create the token
        var payload = {loginname: data[0].loginname, fullname: data[0].fullname};
        var tok = jwt.sign(payload, secret, {expiresIn: "12h"});

        //send logininfo + token to the client
        res.status(200).json({loginname: data[0].loginname, fullname: data[0].fullname, token: tok});
    }).catch(function(err) {

        res.status(500).json({err});

    });
});

module.exports = router;

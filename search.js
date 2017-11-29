var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var db = require('./dbconnect');

router.get('/', function (req, res) {

    var upload = req.query.user;

    var sql = `PREPARE get_user(text) AS
            SELECT users.loginname, users.id FROM users WHERE users.loginname=$1;
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

router.get('/view', function(req, res) {

    var user_id = req.query.user_id;

    var sql = `PREPARE view_userlist(int) AS
            SELECT * FROM lists WHERE user_id=$1 AND private=false;
            EXECUTE view_userlist('${user_id}')`;

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE view_userlist");

    if (data.length <= 0) {
        res.status(403).json({msg: "This user doesn't seem to have any public lists..."}); //send
        return; //quit
    } else {

    console.log(data);
    res.status(200).json(data);

    }

    }).catch(function(err) {

        res.status(500).json({err});

    });
});

router.get('/tasks', function(req, res) {
    var list_id = req.query.list_id;

    var sql = `PREPARE view_usertasks(int) AS
            SELECT * FROM tasks WHERE list_id=$1;
            EXECUTE view_usertasks('${list_id}')`;

        db.any(sql).then(function(data) {

            db.any("DEALLOCATE view_usertasks");

        if (data.length <= 0) {
            res.status(403).json({msg: "This user doesn't seem to have any tasks in this list"}); //send
            return; //quit
        } else {

        console.log(data);
        res.status(200).json(data);

        }

        }).catch(function(err) {

            res.status(500).json({err});

        });
})

module.exports = router;

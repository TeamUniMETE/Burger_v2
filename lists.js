const express = require('express');
var router = express.Router();
var db = require('./dbconnect');
const bodyParser = require('body-parser').text();
const jwt = require('jsonwebtoken');

var secret = "greatmindcomesgreatresponsibilty";


router.use(function (req, res, next) {

    var token = req.query['token'];

    console.log('token' + token);

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

router.post('/newlist', bodyParser, function(req, res) {

    var upload = JSON.parse(req.body);

    console.log('upload' + upload);

    var sql = `PREPARE insert_list (int, text, boolean, int) AS
            INSERT INTO list VALUES(DEFAULT, $2, $3, $4);
            EXECUTE insert_list(0, '${upload.list_name}', '${upload.private}', '${upload.user_id}')`;

    console.log(sql);

    db.any(sql).then(function(data) {

        res.status(200).json(data);
        console.log(data);

    }).catch(function(err) {

        res.status(500).json({err});
    });
});

router.get('/getlist', function(req, res) {

    var upload = req.query.user;
});



module.exports = router;

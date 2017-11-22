const express = require('express');
var router = express.Router();
var db = require('./dbconnect');
const bodyParser = require('body-parser').text();
const jwt = require('jsonwebtoken');

var secret = "greatmindcomesgreatresponsibilty";

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

router.post('/getboard', bodyParser, function(req, res) {

    var upload = JSON.parse(req.body);

    var sql = `PREPARE get_boards (int) AS
            SELECT * FROM board WHERE boardname=$1;
            EXECUTE get_boards('${board.boardId}')`;

            db.any(sql).then(function(data) {

                db.any("DEALLOCATE get_boards");

                res.status(200).json(data);

            }).catch(function(err) {

                res.status(500).json(err);
            });
});

module.exports = router;

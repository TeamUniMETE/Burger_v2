const express = require('express');
var router = express.Router();
var db = require('./dbconnect');
const bodyParser = require('body-parser').text();
const jwt = require('jsonwebtoken');

var secret = "greatmindcomesgreatresponsibilty";
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

//GET REQUESTS----------------------

router.get('/', function(req, res) {

    var upload = req.query.user_id;

    var sql = `PREPARE get_lists(int) AS
            SELECT * FROM lists WHERE user_id=$1;
            EXECUTE get_lists('${upload}')`;

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE get_lists");

    if (data.length <= 0) {
        res.status(403).json({msg: "couldnt find any lists"}); //send
        return; //quit
    } else {

    console.log(data);
    res.status(200).json(data);

    }

    }).catch(function(err) {

        res.status(500).json({err});

    });
});


router.get('/single', function(req, res) {

    var user_id = req.query.user_id;
    var list_id = req.query.list_id;

    var sql = `PREPARE get_list(int, int) AS
            SELECT * FROM lists WHERE id=$1 AND user_id=$2;
            EXECUTE get_list('${list_id}', '${user_id}')`;

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE get_list");

    if (data.length <= 0) {
        res.status(403).json({msg: "couldnt get the list"}); //send
        return; //quit
    } else {

    console.log(data);
    res.status(200).json(data);

    }

    }).catch(function(err) {

        res.status(500).json({err});

    });
});
//DELETE REQUEST---------------------
router.delete('/list', function(req, res) {

    var listid = req.query.listid;

    var sql = `PREPARE delete_list (int) AS
            DELETE FROM lists WHERE id=$1;
            EXECUTE delete_list('${listid}')`;

    db.any(sql).then(function(data) {

        db.any('DEALLOCATE delete_list');
        res.status(200).json({msg: "list deletion - ok"});

    }).catch(function(err) {

        res.status(500).json({err});
    });
})

//POST REQUESTS----------------------

router.post('/', bodyParser, function(req, res) {

    var upload = JSON.parse(req.body);

    console.log('upload' + upload);

    var sql = `PREPARE insert_list (int, text, boolean, int, text) AS
            INSERT INTO lists VALUES(DEFAULT, $2, $3, $4, $5);
            EXECUTE insert_list(0, '${upload.list_name}', '${upload.private}', '${upload.user_id}', '${upload.desc}')`;

    console.log(sql);

    db.any(sql).then(function(data) {

        db.any('DEALLOCATE insert_list');
        res.status(200).json({msg: "list insert ok"});

    }).catch(function(err) {

        res.status(500).json({err});
    });
});

router.post('/priv', bodyParser, function(req, res) {

    var upload = JSON.parse(req.body);
    var privacy = req.query.privacy;

    var sql = `PREPARE update_privacy(boolean, int, int) AS
            UPDATE lists SET private=$1 WHERE id=$2 AND user_id=$3;
            EXECUTE update_privacy('${privacy}', '${upload.list_id}', '${upload.user_id}') `;


    db.any(sql).then(function(data) {

        db.any('DEALLOCATE update_privacy');
        res.status(200).json({msg: "list insert ok"});

    }).catch(function(err) {

        res.status(500).json({err});
    });

});

router.post('/desc', bodyParser, function(req, res) {

    var upload = JSON.parse(req.body);

    var sql = `PREPARE update_desc(text, int, int) AS
            UPDATE lists SET description=$1 WHERE id=$2 AND user_id=$3;
            EXECUTE update_desc('${upload.description}', '${upload.list_id}', '${upload.user_id}')`;

            db.any(sql).then(function(data) {

                db.any('DEALLOCATE update_desc');
                res.status(200).json({msg: "description update - OK"});

            }).catch(function(err) {

                res.status(500).json({err});
            });
});


module.exports = router;

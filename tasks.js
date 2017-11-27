const express = require('express');
var router = express.Router();
var db = require('./dbconnect');
const bodyParser = require('body-parser').text();
const jwt = require('jsonwebtoken');

var secret = "greatmindcomesgreatresponsibilty";
var logindata;


router.use(function (req, res, next) {
    console.log('validate token');
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
router.post('/', bodyParser, function(req, res) {
    var upload = JSON.parse(req.body);

    var sql = `PREPARE get_tasks(int) AS
            SELECT * FROM tasks WHERE list_id=$1;
            EXECUTE get_tasks('${upload.list_id}')`;

    db.any(sql).then(function(data) {

        db.any('DEALLOCATE get_tasks');

        if(data.length <= 0) {
            res.status(403).json({msg: 'couldnt find anything'})
            return;
        }

        res.status(200).json(data);

    }).catch(function(err) {

        res.status(500).json({err});
    });

});

//POST REQUESTS----------------------
router.post('/add', bodyParser, function(req, res) {

    var upload = JSON.parse(req.body);

    var sql = `PREPARE insert_task (int, text, text, text, boolean, int) AS
            INSERT INTO tasks VALUES(DEFAULT, $2, $3, $4, $5, $6);
            EXECUTE insert_task(0, '${upload.task_name}', '${upload.deadline_date}', '${upload.priority}', '${upload.completed}', '${upload.list_id}')`;

    console.log(sql);

    db.any(sql).then(function(data) {

        db.any('DEALLOCATE insert_task');

        res.status(200).json({msg: 'insert task - ok'});

    }).catch(function(err) {

        res.status(500).json({err});
    });
});

router.post('/priority', bodyParser, function(req, res) {

    var upload = JSON.parse(req.body);

    var sql = `PREPARE update_priority(text, int) AS
            UPDATE tasks SET priority=$1 WHERE id=$2;
            EXECUTE update_priority('${upload.priority}', '${upload.task_id}')`;

    db.any(sql).then(function(data) {

        db.any('DEALLOCATE update_priority');

        res.status(200).json({msg: 'UPDATE -priority- EY OKEY'});

    }).catch(function(err) {

        res.status(500).json({err});
    });

});

router.post('/completed', bodyParser, function(req, res) {
    var upload = JSON.parse(req.body);

    var sql = `PREPARE update_completed(boolean, int) AS
            UPDATE tasks SET completed=$1 WHERE id=$2;
            EXECUTE update_completed('${upload.completed}', '${upload.task_id}')`;

    db.any(sql).then(function(data) {

        db.any('DEALLOCATE update_completed');

        res.status(200).json({msg: 'UPDATE -completed- EY OKEY'});

    }).catch(function(err) {

        res.status(500).json({err});
    });
})

module.exports = router;

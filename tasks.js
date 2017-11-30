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
router.get('/', function(req, res) {

    var list_id = req.query.list_id;

    var sql = `PREPARE get_tasks(int) AS
            SELECT * FROM tasks WHERE list_id=$1 ORDER BY id;
            EXECUTE get_tasks('${list_id}')`;

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

router.get('/n', function(req, res) {

    var user_id = req.query.user_id;
    var date = req.query.today;

    var sql = `PREPARE get_notifications(text, int) AS
            SELECT * FROM tasks WHERE deadline_date=$1 AND user_id=$2 AND completed=false;
            EXECUTE get_notifications('${date}', '${user_id}')`;

    db.any(sql).then(function(data) {

        db.any('DEALLOCATE get_notifications');

        if(data.length <= 0) {
            res.status(403).json({msg: 'no tasks today'});
            return;
        }

        res.status(200).json(data);

    }).catch(function(err) {

        res.status(500).json({err});
    });

});

//DELETE REQUESTS--------------------
router.delete('/task', function(req, res) {

    var taskid = req.query.taskid;
    var listid = req.query.listid;

    var sql = `PREPARE delete_task(int, int) AS
            DELETE FROM tasks WHERE id=$1 AND list_id=$2 RETURNING *;
            EXECUTE delete_task('${taskid}', '${listid}')`;


    db.any(sql).then(function(data) {

        db.any('DEALLOCATE delete_task');

        res.status(200).json({msg: 'delete task - ok'});

    }).catch(function(err) {

        res.status(500).json({err});
    });
});

//POST REQUESTS----------------------
router.post('/add', bodyParser, function(req, res) {

    var upload = JSON.parse(req.body);

    var sql = `PREPARE insert_task (int, text, text, text, boolean, int, int) AS
            INSERT INTO tasks VALUES(DEFAULT, $2, $3, $4, $5, $6, $7);
            EXECUTE insert_task(0, '${upload.task_name}', 0, '${upload.priority}', '${upload.completed}', '${upload.list_id}', '${upload.user_id}')`;


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
});

router.post('/deadline', bodyParser, function(req, res) {
    var upload = JSON.parse(req.body);

    var sql = `PREPARE update_deadline(date, int) AS
            UPDATE tasks SET deadline_date=$1 WHERE id=$2;
            EXECUTE update_deadline('${upload.deadline_date}', '${upload.task_id}')`;

    db.any(sql).then(function(data) {

        db.any('DEALLOCATE update_deadline');

        res.status(200).json({msg: 'UPDATE -deadline- EY OKEY'});

    }).catch(function(err) {

        res.status(500).json({err});
    });
})

module.exports = router;

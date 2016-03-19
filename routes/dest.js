var express = require('express');
var router = express.Router();
var db = require("../config/db");


router.get('/:id', function(req, res, next) {
    console.log(req.params.id);
    var queryString = "SELECT * FROM destination";
    if (req.params.id !== '0') {
        queryString += " WHERE id=" + req.params.id;
    };
    db.query(queryString, function(err, row, fields) {
        if (err) {
            res.status(400).send(err)
        };
        res.send(row);
    });
});

router.get('/country/:country', function(req, res, next) {
    db.query("SELECT * FROM destination WHERE ?", req.params, function(err, row, fields) {
        if (err) {
            res.status(400).send(err)
        };
        res.send(row);
    });
});

router.post('/', function(req, res, next) {
    db.query("INSERT INTO destination SET ?", req.body, function(err, result) {
        if (err) {
            res.status(400).send(err)
        };
        res.send("Result: ", result);
    });
});

router.put('/:id', function(req, res, next) {
    db.query("UPDATE destination SET ? WHERE ?", [req.body, req.params], function(err, result) {
        if (err) {
            res.status(400).send(err);
        };
        res.send("Result: ", result);
    });
});

router.delete('/:id', function(req, res, next) {
    db.query("DELETE FROM destination WHERE ?", req.params, function(err, result) {
        if (err) {
            res.status(400).send(err);
        };
        res.send("Result: ", result);
    });
});

module.exports = router;
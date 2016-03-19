var express = require('express');
var router = express.Router();
var db = require("../config/db");


router.get('/:id', function(req, res, next) {
    console.log(req.params.id);
    var queryString = "SELECT * FROM itinerary";
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

router.get('/dest/:dest_id', function(req, res, next) {
    var queryString = "";
    if (req.params.dest_id === '0') {
        queryString = "SELECT * FROM destination INNER JOIN itinerary ON destination.id = itinerary.dest_id";
    }
    else{
        queryString = "SELECT * FROM destination INNER JOIN itinerary ON destination.id = itinerary.dest_id WHERE destination.id=" +req.params.dest_id;
    };
    db.query(queryString, function(err, row, fields) {
        if (err) {
            res.status(400).send(err)
        };
        res.send(row);
    });
});

router.post('/:dest_id', function(req, res, next) {
    var newDat = req.body;
    newDat.dest_id = req.params.dest_id;
    db.query("INSERT INTO itinerary SET ?", newDat, function(err, result) {
        if (err) {
            res.status(400).send(err)
        };
        res.send("Result: ", result);
    });
});

router.put('/:id', function(req, res, next) {
    db.query("UPDATE itinerary SET ? WHERE ?", [req.body, req.params], function(err, result) {
        if (err) {
            res.status(400).send(err);
        };
        res.send("Result: ", result);
    });
});

router.delete('/:id', function(req, res, next) {
    db.query("DELETE FROM itinerary WHERE ?", req.params, function(err, result) {
        if (err) {
            res.status(400).send(err);
        };
        res.send("Result: ", result);
    });
});

module.exports = router;
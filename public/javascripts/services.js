'use strict';

var app = angular.module("myApp");

app.service("destService", function($http) {
    var destList = [];
    var curDest = {};

    this.getDests = function() {
        $http.get("/dest/0").then(res => {
            this.destList = res.data;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.getDestById = function(dest) {
        $http.get("/dest/" + dest.id).then(res => {
            this.curDest = res.data;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.newDest = function(newData) {
        $http.post("/dest/", newData).then(res => {
            console.log(res);
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.updateDest = function(newData) {
        $http.put("/dest/" + newData.id, newData).then(res => {
            console.log(res);
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.delDest = function(newData) {
        $http.delete("/dest/" + newData.id).then(res => {
            console.log(res);
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };


});


app.service("itinService", function($http) {
    var allItin = [];
    var curDest = {};

    this.getAllDestItin = function() {
        $http.get("/itin/0").then(res => {
            this.allItin = res.data;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.getDestItinById = function(dest) {
      var pathString="/itin/dest/" + dest;
        $http.get(pathString).then(res => {
            this.curDestItin = res.data;
        }, err => {
            if (err) {
                this.curDestItin = err;
                console.log(err);
            }
        });
    };

    this.newItin = function(newData) {
        var dataSend = angular.copy(newData);
        dataSend.arrival_date = dateConverter(dataSend.arrival_date);
        dataSend.arrival_time = timeConverter(dataSend.arrival_time);
        dataSend.departure_date = dateConverter(dataSend.departure_date);
        dataSend.departure_time = timeConverter(dataSend.departure_time);
        console.log(dataSend);
        $http.post("/itin/"+dataSend.dest_id, dataSend).then(res => {
            console.log(res);
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.updateItin = function(newData) {
        var dataSend = angular.copy(newData);
        dataSend.arrival_date = dateConverter(dataSend.arrival_date);
        dataSend.arrival_time = timeConverter(dataSend.arrival_time);
        dataSend.departure_date = dateConverter(dataSend.departure_date);
        dataSend.departure_time = timeConverter(dataSend.departure_time);
        $http.put("/itin/" + dataSend.id, dataSend).then(res => {
            console.log(res);
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.delItin = function(newData) {
        $http.delete("/itin/" + newData.id).then(res => {
            console.log(res);
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };


});

function dateConverter(date) {
    var d = new Date(date);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    return year + "-" + padZeros(month) + "-" + padZeros(day);
}

function timeConverter(date) {
    var d = new Date(date);
    var hours = padZeros(d.getHours());
    var minutes = padZeros(d.getMinutes());
    var day = padZeros(d.getSeconds());

    return hours + ":" + minutes + ":" + day;
}

function padZeros(inp) {
    if (inp < 10) {
        inp = "0" + inp;
    }
    return inp;
}
'use strict';

var app = angular.module("myApp");

app.controller("mainCtrl", function($scope, $state, destService) {
    $scope.destList = [];
    $scope.destView = true;

    updateDests();

    function updateDests() {
        destService.getDests();
    };

    $scope.$watch(function() {
        return destService.destList;
    }, function(curVal, preVal) {
        $scope.destList = curVal;
        console.log(curVal);
    });

    $scope.addDest = function() {
        $scope.destDet = {};
        $scope.formtype = "Add a Destination";
        $scope.destView = false;
    }

    $scope.modDest = function(destInp) {
        console.log(this.dest);
        $scope.destDet = this.dest;
        $scope.formtype = "Modify Destination";
        $scope.destView = false;
    }

    $scope.upDest = function(destData, destType) {
        if (destType === "Add a Destination") {
            destService.newDest(destData);
        } else {
            destService.updateDest(destData);
        }
        updateDests();
    }

    $scope.destItin = function(inpVal) {
        console.log(this.dest);
        $state.go("itinerary", {
            dest: this.dest
        });
    }
});

app.controller("destCtrl", function($scope, $state) {
    console.log("destCtrl");
});

app.controller("itinCtrl", function($scope, $state, $stateParams, itinService) {
    $scope.curDest = $stateParams.dest;
    getDestItins($scope.curDest.id);
    $scope.hasNotes = false;
    $scope.addItinShow = false;
    var curDestination=angular.copy($scope.curDest.id);
    function getDestItins() {
      console.log("curDest id: ", $scope.curDest.id);
        itinService.getDestItinById($scope.curDest.id);
    }

    $scope.$watch(function() {
        return itinService.curDestItin;
    }, function(curVal, preVal) {
        $scope.itinList = curVal;
        if (curVal.status === 400) {
            $scope.hasNotes = false;
        } else {
            $scope.hasNotes = true;
        }
    });

    $scope.addForm = function(){
          $scope.addItinShow = true;
    }

    $scope.addItin = function(itin) {
        $scope.newNote.dest_id = Angular.copy($scope.curDest.id);
        itinService.newItin($scope.newNote);
    }

    $scope.getItinDetails = function(item){
      $scope.addItinShow=true;
      $scope.hasNotes=false;
      var upData = angular.copy(item.itin)
      $scope.newNote = upData;
    }
});
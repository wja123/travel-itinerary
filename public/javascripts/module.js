 'use strict';

 $(document).ready(function() {
     $('.button-collapse').sideNav();
 });

 var app = angular.module("myApp", ["ui.router"]);

 app.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
         .state("home", {
             url: "/",
             templateUrl: "/partials/home.html",
             contoller: "mainCtrl"
         })
         .state("itinerary", {
             url: "/itinerary/",
             templateUrl: "/partials/itinerary.html",
             controller: "itinCtrl",
             params:{dest:null}
         })
     $urlRouterProvider.otherwise("/");
 });
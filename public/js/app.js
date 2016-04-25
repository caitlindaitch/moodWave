"use strict";

(function(){

  angular
  .module("music", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    Router
  ])
  .factory("moodFactory", [
    "$resource",
    Moods
  ])
  .controller("moodIndexController", [
    "Moods",
    moodIndexController
  ])

  function Router($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/playlist-welcome.html"
    })
    .state("index", {
      url: "/playlist",
      templateUrl: "/assets/html/playlist-generator.html",
      controller: "moodIndexController",
      controllerAs: "moodIndexVM"
    })
  }

  function Moods($resource){
    var Mood = $resource("/api/moods", {}, {
      update: {method: "PUT"}
    });
    Mood.all = Mood.query();
    console.log(Mood)
    return Mood;
  }

  function moodIndexController(mood){
    var vm = this;
    vm.mood = mood.all;
    console.log(vm.mood)
  }
})();

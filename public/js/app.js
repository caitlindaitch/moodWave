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
  .factory("MoodFactory", [
    "$resource",
    MoodFactory
  ])
  .controller("moodIndexController", [
    "MoodFactory",
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

  function MoodFactory($resource){
    var Mood = $resource("/api/moods", {}, {
      update: {method: "PUT"}
    });
    Mood.all = Mood.query();
    return Mood;
  }

  function moodIndexController(mood){
    var vm = this;
    vm.moods = mood.all;
  }
})();

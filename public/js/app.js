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
  .controller("moodShowController", [
    "MoodFactory",
    "$stateParams",
    moodShowController
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
    .state("show", {
      url: "/playlist/:name",
      templateUrl: "/assets/html/playlist-show.html",
      controller: "moodShowController",
      controllerAs: "moodShowVM"
    })
  }

  function MoodFactory($resource){
    var Mood = $resource("/api/moods", {}, {
      update: {method: "PUT"}
    });

    Mood.find = function(property, value, callback){
      Mood.all.$promise.then(function(){
        Mood.all.forEach(function(mood){
          if(mood[property] == value) callback(mood);
        });
      });
    };

    Mood.all = Mood.query();
    return Mood;
  };

  function moodIndexController(mood){
    var vm = this;
    vm.moods = mood.all;
  };

  function moodShowController(mood, $stateParams){
    var vm = this;

    mood.find("name", $stateParams.name, function(mood){
      vm.name = mood.name;
      var artist = mood.artist;
      var song = mood.song;

      apiCall(artist, song);
    });

    function apiCall(artist, song){
      var Music = "https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + song + "&api_key=182f7264f544c752fc6f20fdd6134d54&format=json"

      vm.songs = [];
      vm.artists = [];
      vm.urls = [];

      $.getJSON( Music, function( data ) {
        var tracks = data.similartracks.track;

        for (var i=3; i<13; i++){
          vm.songs.push(tracks[i].name);
          vm.artists.push(tracks[i].artist.name);
          vm.urls.push(tracks[i].url);
        }
      }).then(function(){
        for (var i=0; i<vm.songs.length; i++){
          $(".songs").append("<div class='track'><div class='song'><a href='" + vm.urls[i] + "'>" + vm.songs[i] + "</a></div><div class='artist'><em>" + vm.artists[i] + "</em></div></div>")
        }
      });
    };
  };

})();

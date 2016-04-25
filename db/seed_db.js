var mongoose = require("./connection.js");
var seeds = require("./seeds.json");

var Moods = mongoose.model("Moods");

console.log("I am seeding the database for you...");

Moods.remove({}).then(function(){
  Moods.collection.insert(seeds).then(function(){
    process.exit();
  })
})

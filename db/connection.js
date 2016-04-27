var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/moods");

var MoodSchema = new mongoose.Schema(
  {
    name: String,
    artist: String,
    song: String
  }
);

mongoose.model("Moods", MoodSchema);

module.exports = mongoose;

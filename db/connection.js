var mongoose = require("mongoose");

if (process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
} else {
  mongoose.connect("mongodb://localhost/moods");
}

var MoodSchema = new mongoose.Schema(
  {
    name: String,
    artist: String,
    song: String
  }
);

mongoose.model("Moods", MoodSchema);

module.exports = mongoose;

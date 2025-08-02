const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genres: [{ type: String }],
    runtime: { type: Number },
    poster: { type: String },
    released: { type: Date },
    plot: { type: String },
    cast: [{ type: String }],
    languages: [{ type: String }],
    fullplot: { type: String }
    // Add other fields from sample_mflix.movies as needed
  },
  { collection: "movies" }
);

module.exports = mongoose.model("Movies", movieSchema);
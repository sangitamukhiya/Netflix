import mongoose from "mongoose";

//set rules/schema

const moviesSchema = new mongoose.Schema({
  name: String,
  releaseYear: Number,
  mainActor: String,
  rating: Number,
});

//create table
const Movies = mongoose.model("Movies", moviesSchema);

export default Movies;

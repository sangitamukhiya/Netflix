import express from "express";

import connectDB from "./connect.db.js";
import Movies from "./movies.js";
import mongoose from "mongoose";
const app = express();

//to make understand json

app.use(express.json());

//==============================database connection================
connectDB();

//********************************************routes */
app.post("/movies/add", async (req, res) => {
  const newMovie = req.body;
  await Movies.create(newMovie);
  return res.status(200).send({ message: "Movies is added successfully....." });
});

//get movies list

app.get("/movies/list", async (req, res) => {
  const moviesList = await Movies.find(); //find le array return garxa
  return res.status(200).send({ message: "success", Movies: moviesList });
});

//**********get movies list by id */

app.get("/movies/details/:id", async (req, res) => {
  // extract course id from req.params
  const moviesId = req.params.id;

  //validate for mongo id
  const isValidMongoId = mongoose.isValidObjectId(moviesId);

  //if not valide id
  if (!isValidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }

  // find course by id

  const requiredMovies = await Movies.findOne({ _id: moviesId });

  // if not course,throw error

  if (!requiredMovies) {
    return res.status(404).send({ message: "Movies does not exist. " });
  }
  // send res
  return res.status(200).send({ message: "success", Movies: requiredMovies });
});

//**************delete by id*********************/
app.delete("/movies/delete/:id", async (req, res) => {
  // extract course id from req.params

  const moviesId = req.params.id;
  // check for mongo id validity

  const isValidMongoId = mongoose.isValidObjectId(moviesId);
  // if not valid mongo id, throw error

  if (!isValidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }
  // find course by id

  const requiredMovies = await Movies.findOne({ _id: moviesId });
  // if not course, throw error
  if (!requiredMovies) {
    return res.status(200).send({ message: "movies does not exist." });
  }
  // delete course

  await Movies.deleteOne({ _id: moviesId });
  // send response

  return res.status(200).send({ message: "Movies is deleted successfully..." });
});

//*********************************port and server */
const PORT = 9000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});

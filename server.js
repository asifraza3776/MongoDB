const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({

    name: String,
    director: String,
    produced: String,
    releaseDate: String,
    boxOffice: Number,
    imageurl: String
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://razaasif5353:Asifr1566@asif.f14ig8d.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.log(err);
});

app.use(express.json());

// Get all movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(400).send("Server error");
    }
});

// Create a new movie
app.post('/movies', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update a movie by ID
app.patch('/movies/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedMovie) {
            res.json(updatedMovie);
        } else {
            res.status(404).send("Movie not found");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a movie by ID
app.delete('/movies/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (deletedMovie) {
            res.json(deletedMovie);
        } else {
            res.status(404).send("Movie not found");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

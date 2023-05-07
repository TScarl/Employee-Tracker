const express = require('express');
const mysql = require('mysql2')
// is path actually needed?
const path = require('path');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// don't think is needed as app is in CLI
// app.use(express.static('public'));

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // how to hide password during video?
        password: 'Abcd!234', 
        database: 'business_db'
    },
    console.log(`Connected to the movie_db database.`)
);

// below here is a boiler plate




// // * It's done when the `/api/movies` route renders a list of all movies.
// app.get('/api/movies', function (req, res) {
//     db.query('SELECT * FROM movies', function (err, results) {
//         if (err) {
//             console.error('Failed to retrieve movie list: ' + err.message);
//             return res.statusCode(500).json({ error: "Failed to retrieve movie list" })
//         }
//         console.log(results);
//         return res.json({ movies: results })
//     });
// })

// // * It's done when the `/api/add-movie` route successfully adds a movie when tested using Insomnia.
// app.post('/api/add-movie', function (req, res) {
//     const movieName = req.body.movie_name;

//     db.query(`INSERT INTO movies (movie_name) VALUE (?)`, movieName, function (err, results) {
//         if (err) {
//             console.error('Failed to add movie to movies: ' + err.message);
//             return res.statusCode(500).json({ error: "Failed to add movie to movies" })
//         }
//         console.log(results);
//         return res.json({ movies: results })
//     })
// })

// // * It's done when the `/api/update-review` route successfully updates a movie when tested using Insomnia.
// app.put('/api/update-review', function (req, res) {
//     const newReview = req.body.review;
//     const id = req.body.id

//     db.query('UPDATE reviews SET review = ? WHERE id = ?', [newReview, id], (err, results) => {
//         if (err) {
//             console.error('Failed to add movie to movies: ' + err.message);
//             return res.statusCode(500).json({ error: "Failed to add movie to movies" })
//         }
//         console.log(results);
//         return res.json({ movies: results })
//     })
// })
// // * It's done when the `/api/movie/:id` route deletes a route when tested using Insomnia.
// app.delete(`/api/movie/:id`, function (req, res) {
//     const id = req.params.id;

//     db.query(`DELETE FROM movies WHERE id = ?`, id, (err, results) => {
//         if (err) {
//             console.error('Failed to delete movie from movies: ' + err.message);
//             return res.statusCode(500).json({ error: "Failed to delete movie from movies" })
//         }
//         console.log(results);
//         return res.json({ movies: results })
//     })
// })

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`));

    module.exports = {
        db
    };
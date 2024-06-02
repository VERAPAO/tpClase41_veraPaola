const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const moviesControllerApi = {

  'list': (req, res) => {
    const countAllMovies = db.Movie.count({
        attributes:{
          exclude: ["created_at","updated_at"]
        }          
    })
    const listMovies = db.Movie.findAll({
        attributes:{
          exclude: ["created_at","updated_at"]
        }          
    })

    Promise.all([countAllMovies, listMovies])
        .then(([count, movies]) => {
            res.status(200).json({
                meta: {
                    status: 200,
                    total: count,
                    url: "api/movies"
                },
                data: {
                    listMovies: movies
                }
            })
        })
        .catch((err) => {
            res.status(500).json({
              ok: false,
              msg: err.message,
            });
          });
  },

  'detail': (req, res) => {
    db.Movie.findByPk(req.params.id, {
        attributes:{
          exclude: ["created_at","updated_at"]
        }          
    })
    .then(movie => {
            if (!movie) {
                return res.status(404).json({ error: "Película no encontrada" });
            }
            const movieData = {
                id: movie.id,
                title: movie.title,
                rating: movie.rating,
                awards: movie.awards,
                release_date: movie.release_date,
                lenght: movie.lenght,
                genre_id: movie.genre_id
            };

            res.status(200).json({ok: true, data: movieData});
    })
    .catch((err) => {
        res.status(500).json({
          ok: false,
          msg: err.message,
        });
      });
  },

    'create': (req, res) => {
            
            db.Movie.create(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                }
            ).then(() => {

                res.status(201).json({
                  ok: true,
                  msg: "Movie creado con éxito",
                });
                
            })
            .catch((err) => {
                res.status(500).json({
                  ok: false,
                  msg: err.message,
            });
    });
        
        
},

    'delete': (req, res) => {

        db.Movie.destroy({
            where: {
             id: req.params.id,
            },
          })
        .then(() => {
              res.status(200).json({
                ok: true,
                msg: "Movie borrada con éxito",
              });
        })
        .catch((err) => {
              res.status(500).json({
                ok: false,
                msg: err.message,
        });
        });

    }

}


module.exports = moviesControllerApi;
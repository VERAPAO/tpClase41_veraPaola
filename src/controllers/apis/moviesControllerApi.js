const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const moviesControllerApi = {
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
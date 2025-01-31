const express = require("express");
const router = express.Router();
const { addItinerary, addPoints } = require("../db/queries/helpers");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const {
      user_id,
      accommodations,
      response_prompt,
      city,
      country,
      image_url,
      points,
    } = req.body;
    addItinerary(
      user_id,
      accommodations,
      response_prompt,
      city,
      country,
      image_url,
      db
    )
      .then((itinerary_id) => {
        points.forEach((point) => {
          const { title, latitude, longitude, description, image_url, rating } =
            point;
          addPoints(
            itinerary_id,
            title,
            latitude,
            longitude,
            description,
            image_url,
            rating,
            db
          );
        });

        res
          .status(201)
          .json({ status: "success", message: "Points saved successfully" });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Itinerary did not save" });
      });
  });

  return router;
};

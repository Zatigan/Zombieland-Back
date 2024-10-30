import {Attraction, Category} from "../../models/index.js"

export async function getAllAttractions(req,res) {
  const attractions = await Attraction.findAll({ include: "categories" });
  res.json(attractions);
};

export async function getOneAttraction(req, res) {
  const attractionId = parseInt(req.params.id)

  if (isNaN(attractionId)) {
    return res.status(404).json({ error: "Attraction not found. Please verify the provided id"})
  }

  const attraction = await Attraction.findByPk(attractionId);

  if (! attraction) {
    return res.status(404).json({ error: "Attraction not found. Please verify the provided id"})
  }

  res.json(attraction)
}
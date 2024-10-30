import { Attraction } from "../../models/attraction-model.js"

export async function getAllAttractions(req, res) {
  const attractions = await Attraction.findAll();
  res.json(attractions)
}


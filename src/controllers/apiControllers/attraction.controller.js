import {Attraction, Category} from "../../models/index.js"

export async function getAllAttractions(req,res) {
  const attractions = await Attraction.findAll({ include: "categories" });
  res.json(attractions);
};
import {Attraction} from "../../models/index.js"

export async function attractionPage(req,res) {
  const attractions = await Attraction.findAll({ include: "categories" });
  res.render("attractions", {attractions});
};

export async function getOneAttraction(req, res) {
  const attractionId = parseInt(req.params.id)
  const attraction = await Attraction.findByPk(attractionId);
  res.render("attraction", {attraction});
};
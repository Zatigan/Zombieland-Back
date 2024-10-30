import {Attraction, Category, sequelize} from "../../models/index.js"

export async function getAllAttractions(req,res) {
  const attractions = await Attraction.findAll({ include: "categories" });
  res.json(attractions);
};

// Tri des attractions par catégorie

export async function getAttractionByCategory(req, res) {
  const categoryId = parseInt(req.params.id);

  if (isNaN(categoryId)) {
    return res.status(400).json({ error: "ID must be an integer." });
  }
  const attractionsByCategory = await Attraction.findAll({
    include: {
      model: Category,
      as: "categories",
      where: { id: categoryId },
      attributes: ["id", "name"],
    },
  });

  if (attractionsByCategory.length === 0) {
    return res.status(404).json({ message: "No attractions found for this category." });
  }

  res.json(attractionsByCategory);
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

// Trouver 3 attractions aléatoires

export async function getThreeRandomAttractions(req, res) {

  const getThreeAttractions = await Attraction.findAll(
    { include: "categories",
      limit: 3,
      order: sequelize.random()
     });
  res.json(getThreeAttractions);
}
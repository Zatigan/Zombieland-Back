import { Category } from "../../models/index.js";

export async function getAllCategories(req,res) {
  const categories = await Category.findAll();
  res.json(categories);
};
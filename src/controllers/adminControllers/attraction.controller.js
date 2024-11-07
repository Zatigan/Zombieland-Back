import {Attraction, Category} from "../../models/index.js"

export async function attractionPage(req,res) {
  const attractions = await Attraction.findAll({ include: "categories", order: [['id', 'ASC']] });
  const successMessage = req.query.success;
  res.render("attractions", {attractions, successMessage});
};

export async function getOneAttraction(req, res) {
  const attractionId = parseInt(req.params.id)

  const attraction = await Attraction.findByPk(attractionId, {
    include: "categories"
  });
  res.render("attraction", {attraction});
};

export async function updateAttraction(req, res){

  const attractionId = parseInt(req.params.id);
console.log(attractionId)
  const attraction = await Attraction.findByPk(attractionId);

console.log(req.body)
  const categoryselected = req.body.category
  const categoryBdd = await Category.findOne(({ where: { name: categoryselected } }));


  const image = req.files['image'] ? `/img/${req.files['image'][0].filename}` : attraction.image;
  const caroussel1 = req.files['caroussel1'] ? `/img/${req.files['caroussel1'][0].filename}` : attraction.caroussel1;
  const caroussel2 = req.files['caroussel2'] ? `/img/${req.files['caroussel2'][0].filename}` : attraction.caroussel2;
  const caroussel3 = req.files['caroussel3'] ? `/img/${req.files['caroussel3'][0].filename}` : attraction.caroussel3;

  
  const {name, description_short, description_long, opening_time, closing_time, disable_access, weather_hazard, height_restriction, health_hazard} = req.body


 
  const attractionData = {
  name,
  image, 
  description_short,
  description_long,
  opening_time,
  closing_time,
  disable_access,
  weather_hazard,
  height_restriction,
  health_hazard,
  caroussel1,
  caroussel2,
  caroussel3
 }

 const updatedAttraction = await attraction.update(attractionData);
 await updatedAttraction.setCategories(categoryBdd);
 res.redirect('/admin/attractions?success=true');

}

export async function addAttractionPage(req, res) {
  res.render("newAttraction");
}
export async function addAttraction(req, res) {

  const categoryselected = req.body.category
  const categoryBdd = await Category.findOne(({ where: { name: categoryselected } }));

  
  const image = req.files['image'][0].filename;
  const imageSaved = `/img/${image}`;
  const caroussel1 = req.files['caroussel1'][0].filename;
  const caroussel1Saved =  `/img/${caroussel1}`;
  const caroussel2 = req.files['caroussel2'][0].filename;
  const caroussel2Saved =  `/img/${caroussel2}`;
  const caroussel3 = req.files['caroussel3'][0].filename;
  const caroussel3Saved =  `/img/${caroussel3}`;
  
  const {name, description_short, description_long, opening_time, closing_time, disable_access, weather_hazard, height_restriction, health_hazard} = req.body


 
  const attractionData = {
  name,
  image: imageSaved, 
  description_short,
  description_long,
  opening_time,
  closing_time,
  disable_access,
  weather_hazard,
  height_restriction,
  health_hazard,
  caroussel1: caroussel1Saved,
  caroussel2: caroussel2Saved,
  caroussel3: caroussel3Saved
 }



 const newAttraction = await Attraction.create(attractionData);
 await newAttraction.addCategory(categoryBdd);
 res.redirect('/admin/attractions?success=true');

}

export async function delAttraction(req, res) {
  const attractionId = req.params.id
  await Attraction.destroy({ where: { id: attractionId } });

  res.status(201).redirect('/admin/attractions?success=true');
}
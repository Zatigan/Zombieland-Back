import {Attraction} from "../../models/index.js"

export async function attractionPage(req,res) {
  const attractions = await Attraction.findAll({ include: "categories", order: [['id', 'ASC']] });
  res.render("attractions", {attractions});
};

export async function getOneAttraction(req, res) {
  const attractionId = parseInt(req.params.id)
  const attraction = await Attraction.findByPk(attractionId);
  res.render("attraction", {attraction});
};

export async function addAttractionPage(req, res) {
  res.render("newAttraction");
}
export async function addAttraction(req, res) {
  
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



 await Attraction.create(attractionData);
 res.redirect('/admin/attractions');

}

export async function delAttraction(req, res) {
  const attractionId = req.params.id
  await Attraction.destroy({ where: { id: attractionId } });

  res.status(201).redirect('/admin/attractions');
}
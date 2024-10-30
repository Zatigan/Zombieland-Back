/* import * as argon2 from "argon2";
import jwt from 'jsonwebtoken'
import { User } from "../../models/user.model.js";

const signUpSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .min(12)
    .max(100)
    .pattern(new RegExp('(?=.*[a-z])')) // At least one lowercase letter
    .pattern(new RegExp('(?=.*[A-Z])')) // At least one uppercase letter
    .pattern(new RegExp('(?=.*[0-9])')) // At least one digit

    
  })
  

  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    profil_image: Joi.string().optional()
});




export async function getAuthenticated (req, res) {

} */






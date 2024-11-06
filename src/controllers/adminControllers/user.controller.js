import {User} from "../../models/index.js";

export async function userPage(req, res){
  const users = await User.findAll({ order: [['id', 'ASC']] });
  res.render("users", {users});
};

export async function getOneUser(req, res){
  const userId = Number.parseInt(req.params.id)
  const user = await User.findByPk(userId);
  res.render("user", {user});
};

export async function addUserPage(req, res){
  res.render("newUser");
};

export async function delUser(req, res){
  const userId = req.params.id
  await User.destroy({ where: { id: userId } });
  res.status(201).redirect('/admin/users');
}

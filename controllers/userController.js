const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJwt = (id, login, role) => jwt.sign(
  { id, login, role },
  process.env.SECRET_KEY,
  { expiresIn: '24h' },
);

class UserController {
  login(req, res, next) {
    return res.render('../views/login', { message: '' });
  }

  async auth(req, res, next) {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.render('../views/login', { message: 'Указан неверный логин!' });
    }
    if (user.password !== password) {
      return res.render('../views/login', { message: 'Указан неверный пароль!' });
    }
    const token = generateJwt(user.id, user.login, user.role);
    return res.cookie('jwt', token) && res.redirect('/panel');
  }

  exit(req, res, next) {
    return res.clearCookie('jwt') && res.redirect('/login');
  }

  async getUserList(req, res, next) {
    const users = await User.findAll();
    return res.render('../views/userList', { data: users });
  }

  async postUserList(req, res, next) {
    const { id } = req.body;
    await User.destroy({ where: { id } });
    return res.redirect('/userList');
  }

  getAddUser(req, res, next) {
    return res.render('../views/addUser', { message: '' });
  }

  async postAddUser(req, res, next) {
    const { login, password, role } = req.body;
    console.log(req.body.role)
    const candidat = await User.findOne({ where: { login } });
    if (candidat) {
      res.render('../views/addUser', { message: 'Пользователь с таким логином существует!' });
    } else {
      await User.create({ login, password, role });
      res.render('../views/addUser', { message: 'Пользователь добавлен!' });
    }
  }

  getUser(req, res, next) {
    return res.render('../views/user', { message: '', data: null });
  }

  async postUser(req, res, next) {
    const { login, role } = req.body;
    let user;
    if (!login) {
      user = await User.findAll({ where: { role } });
    } else if (!role) {
      user = await User.findAll({ where: { login } });
    } else {
      user = await User.findAll({ where: { login, role } });
    }
    return res.render('../views/user', { data: user, message: '' });
  }
}

module.exports = new UserController();

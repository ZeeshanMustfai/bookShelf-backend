const { signup_post, login_post } = require("../controller/authController");
const Router = require("express").Router();

Router.post('/signup', signup_post)
Router.post('/login', login_post)

module.exports = Router
const {AddNewBook, GetAllBooks, DeleteOneBook, UpdateOneBook} = require("../controller/bookController");
const { requireAuth } = require("../middleware/authMiddleware");
const Router = require("express").Router();

Router.post('/create', requireAuth, AddNewBook)
Router.get('/', GetAllBooks)
Router.put('/update', requireAuth, UpdateOneBook)
Router.delete("/:id",requireAuth, DeleteOneBook)


module.exports = Router
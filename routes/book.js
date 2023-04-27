const {
	AddNewBook,
	GetAllBooks,
	DeleteOneBook,
	UpdateOneBook,
	SearchBooks,
} = require('../controller/bookController')
const { requireAuth } = require('../middleware/authMiddleware')
const Router = require('express').Router()

Router.get('/', requireAuth, GetAllBooks)
Router.get('/search/:key', requireAuth, SearchBooks)
Router.post('/create', requireAuth, AddNewBook)
Router.put('/update', requireAuth, UpdateOneBook)
Router.delete('/:id', requireAuth, DeleteOneBook)

module.exports = Router

const BookModal = require('../models/Books')

const AddNewBook = async (req, res) => {
	const Book = new BookModal(req.body)
	try {
		const response = await Book.save()
		res.status(200).json({ message: 'New Book added successfully', response })
	} catch (e) {
		res
			.status(400)
			.json({ message: 'Some thing went wrong', error: e?.message })
	}
}

const GetAllBooks = async (req, res) => {
	try {
		const books = await BookModal.find()
		res.status(200).json({ message: 'All book of this user', books })
	} catch (e) {
		res.status(400).json({ message: 'Some thing went wrong' })
	}
}

const UpdateOneBook = async (req, res) => {
	try {
		const book = await BookModal.findById(req.body.id)
		if (book) {
			try {
				const updatedBook = await BookModal.findByIdAndUpdate(
					req.body.id,
					{ $set: { status: req.body.status } },
					{ new: true }
				)
				res
					.status(200)
					.json({ message: 'Book updated Successfully', result: updatedBook })
			} catch (err) {
				res.status(400).json(err)
			}
		} else {
			res.status(201).json({ message: 'Book not found for update' })
		}
	} catch (e) {
		res.status(400).json({ message: 'Something went wrong' })
	}
}

const SearchBooks = async (req, res) => {
	try {
		let result = await BookModal.find({
			$or: [
				{
					title: { $regex: req.params.key },
				},
				{
					authorName: { $regex: req.params.key },
				},
			],
		})
		if (result) {
			res
				.status(200)
				.json({ message: 'Books found successfully', books: result })
		} else {
			res.status(400).json({ message: 'Books not found' })
		}
	} catch (err) {
		res.status(400).json({ message: 'Books not found' })
	}
}

const DeleteOneBook = async (req, res) => {
	try {
		const deletedBook = await BookModal.deleteOne({ owner: req.params.id })
		res.json({ message: 'Book is deleted successfully', deletedBook })
	} catch (e) {
		res.json({ message: 'Some thing went wrong' })
	}
}

module.exports = {
	AddNewBook,
	GetAllBooks,
	DeleteOneBook,
	UpdateOneBook,
	SearchBooks,
}

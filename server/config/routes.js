const auth = require('./auth')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Product = mongoose.model('Product')
const errorHandler = require('../utilities/error-handler')
const passport = require('passport')

module.exports = (app) => {
	app.post('/products/add', (req, res) => {
		return passport.authenticate('protected-request', (err, user) => {
			if (err) {
				return res.status(200).json({
					success: false,
					message: err.message
				})
			}

			if (!user) {
				return res.status(200).json({
					success: false,
					message: 'You do not have access to do this!'
				})
			}

			let productReq = req.body;
			Product.create({
				name: productReq.name || 'No name',
				price: productReq.price || 0,
				image: productReq.image || 'No image',
				type: productReq.type || 'No type',
				status: productReq.status || 'No status',
				author: productReq.author || 'No author',
				reviews: [],
				timestamp: +Date.now()
			})
				.then(product => {
					return res.status(200).json({
						success: true,
						message: 'Product added successfully.',
						product
					})
				})
				.catch(err => {
					let message = errorHandler.handleMongooseError(err)
					return res.status(200).json({
						success: false,
						message: message
					})
				})
		})(req, res)
	})

	app.get('/products/all', (req, res) => {
		const page = parseInt(req.query.page) || 1
		const searchText = req.query.search || ''
		const pageSize = 6

		let startIndex = (page - 1) * pageSize
		let endIndex = startIndex + pageSize

		Product.find({})
			.then(products => {
				if (searchText) {
					products = products.filter(function (item) {
						return item.name.includes(searchText)
					})
				}
				products = products.slice(startIndex, endIndex)
				res.status(200).json({ products })
			})
			.catch(err => {
				let message = errorHandler.handleMongooseError(err)
				return res.status(200).json({
					success: false,
					message: message
				})
			})
	})

	app.get('/products/:id', (req, res) => {
		const id = req.params.id

		Product.find({ '_id': id })
			.then(product => {
				if (product && product[0]) {
					res.status(200).json(product[0])
				} else {
					res.status(200).json('No data!')
				}
			})
			.catch(err => {
				console.log(err);
				let message = errorHandler.handleMongooseError(err)
				return res.status(200).json({
					success: false,
					message: message
				})
			})

		return res.status(200)
	})

	app.post('/products/:id/reviews/add', (req, res) => {
		return passport.authenticate('protected-request', (err, user) => {
			if (err) {
				return res.status(200).json({
					success: false,
					message: err.message
				})
			}

			if (!user) {
				return res.status(200).json({
					success: false,
					message: 'You do not have access to do this!'
				})
			}

			const id = req.params.id
			let reviewReq = req.body;

			Product.find({ '_id': id })
				.then(product => {
					if (product && product[0]) {
						product[0].reviews.push(reviewReq)
						Product.update(
							{ '_id': id },
							{
								reviews: product[0].reviews,
							}
						).then(output => {
							res.status(200).json({
								success: true,
								reviews: product[0].reviews
							})
						})
							.catch(err => {
								let message = errorHandler.handleMongooseError(err)
								return res.status(200).json({
									success: false,
									message: message
								})
							})
					} else {
						res.status(200).json('No data!')
					}
				})
				.catch(err => {
					let message = errorHandler.handleMongooseError(err)
					return res.status(200).json({
						success: false,
						message: message
					})
				})
		})(req, res)
	})

	app.get('/products/:id/reviews', (req, res) => {
		const id = req.params.id

		Product.find({ '_id': id })
			.then(product => {
				if (product && product[0]) {
					return res.status(200).json(product[0].reviews)
				} else {
					return res.status(200).json('No data!')
				}
			})
			.catch(err => {
				let message = errorHandler.handleMongooseError(err)
				return res.status(200).json({
					success: false,
					message: message
				})
			})

		return res.status(200)
	})

	app.post('/users/register', (req, res) => {
		return passport.authenticate('local-signup', (err) => {
			if (err) {
				return res.status(200).json({
					success: false,
					message: err
				})
			}

			return res.status(200).json({
				success: true,
				message: 'You have successfully signed up! Now you should be able to log in.'
			})
		})(req, res)
	})

	app.post('/users/login', (req, res) => {
		return passport.authenticate('local-login', (err, token, userData) => {
			if (err) {
				if (err.name === 'IncorrectCredentialsError') {
					return res.status(200).json({
						success: false,
						message: err.message
					})
				}

				return res.status(200).json({
					success: false,
					message: err.message
				})
			}

			return res.json({
				success: true,
				message: 'You have successfully logged in!',
				token,
				user: userData
			})
		})(req, res)
	})

	app.get('/analytics', (req, res) => {
		return passport.authenticate('protected-request', (err, user) => {
			if (err) {
				return res.status(200).json({
					success: false,
					message: err.message
				})
			}

			if (!user) {
				return res.status(200).json({
					success: false,
					message: 'You do not have access to do this!'
				})
			}

			User.find({})
				.then(users => {
					return res.status(200).json({ users })
				})
				.catch(err => {
					let message = errorHandler.handleMongooseError(err)
					return res.status(200).json({
						success: false,
						message: message
					})
				})
		})(req, res)
	})

	app.all('*', (req, res) => {
		res.status(404)
		res.send('404 Not Found!')
		res.end()
	})
}
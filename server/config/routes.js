const auth = require('./auth')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const errorHandler = require('../utilities/error-handler')
const passport = require('passport')

module.exports = (app) => {
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

    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found!')
        res.end()
    })
}
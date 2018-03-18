import React, { Component } from 'react'
import AuthService from '../../services/authService'
import LoginForm from './LoginForm'
import FormHelpers from '../common/forms/FormHelpers'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: 'test@test.com',
                password: '123456'
            },
            error: ''
        }

        this.handleUserLogin = this.handleUserLogin.bind(this)

        userStore.on(
            userStore.eventTypes.USER_LOGGED_IN,
            this.handleUserLogin)
    }

    componentWillUnmount() {
        userStore.removeListener(
            userStore.eventTypes.USER_LOGGED_IN,
            this.handleUserLogin)
    }

    handleUserChange(event) {
        FormHelpers.handleFormChange.bind(this)(event, 'user')
    }

    handleUserForm(event) {
        event.preventDefault()
        //validate form
        userActions.login(this.state.user)
    }

    handleUserLogin(data) {
        if (!data.success) {
            this.setState({
                error: data.message
            })
        } else {
            AuthService.authenticateUser(data.token)
            AuthService.saveUser(data.user)
            toastr.success(data.message)
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <h1>Login Into Your Account</h1>
                <LoginForm
                    user={this.state.user}
                    error={this.state.error}
                    onChange={this.handleUserChange.bind(this)}
                    onSave={this.handleUserForm.bind(this)} />
            </div>
        )
    }
}

export default LoginPage

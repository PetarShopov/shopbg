import {Component} from 'react'
import AuthService from '../../services/authService'

class LogoutPage extends Component {
    componentWillMount () {
        AuthService.deauthenticateUser()
        AuthService.removeUser()
        this.props.history.push('/')
    }

    render() {
        return null
    }
}

export default LogoutPage

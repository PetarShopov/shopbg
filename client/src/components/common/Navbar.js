import React, { Component } from 'react'
import AuthService from '../../services/authService'
import { Link } from 'react-router-dom'
import userStore from '../../stores/UserStore'

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: AuthService.getUser().name
        }

        this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)

        userStore.on(
            userStore.eventTypes.USER_LOGGED_IN,
            this.handleUserLoggedIn
        )
    }

    handleUserLoggedIn(data) {
        if (data.success) {
            this.setState({
                username: data.user.name
            })
        }
    }

    render() {
        return (
            <div className='menu'>
                <Link to='/' className='navbarLink'>Home</Link>
                {
                    AuthService.isUserAuthenticated() ? (
                        <div>
                            <Link to='/products/add' className='navbarLink'>Add</Link>
                            <span className='navbarLink' >{this.state.username}</span>
                            <Link to='/users/logout' className='navbarLink'>Logout</Link>
                        </div>
                    ) : (
                        <div>
                            <Link to='/users/register' className='navbarLink'>Register</Link>
                            <Link to='/users/login' className='navbarLink'>Login</Link>
                        </div>
                        )
                }
            </div>
        )
    }
}

export default Navbar

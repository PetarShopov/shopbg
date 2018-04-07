import React, { Component } from 'react'
import userStore from '../../stores/UserStore'
import userActions from '../../actions/UserActions'

class Analytics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usersCount: 0,
            productsCount: 0
        }

        this.handleUsersRetrieved = this.handleUsersRetrieved.bind(this)

        userStore.on(
            userStore.eventTypes.USERS_RETRIEVED,
            this.handleUsersRetrieved
        )
    }

    componentDidMount() {
        userActions.all()
    }

    handleUsersRetrieved(data) {
        this.setState({
            usersCount: data.usersCount,
            productsCount: data.productsCount
        })
    }

    render() {
        const users = this.state.usersCount
        const products = this.state.productsCount

        return (
            <div className='analytics'>
                Total number of users {users}.
                <br/>
                Total number of products {products}.
            </div>
        )
    }
}

export default Analytics

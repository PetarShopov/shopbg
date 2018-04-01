import React, { Component } from 'react'
import userStore from '../../stores/UserStore'
import userActions from '../../actions/UserActions'

class Analytics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usersCount: 0
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
            usersCount: data.users.length
        })
    }

    render() {
        const count = this.state.usersCount

        return (
            <div className='analytics'>
                Total number of users {count}.
            </div>
        )
    }
}

export default Analytics

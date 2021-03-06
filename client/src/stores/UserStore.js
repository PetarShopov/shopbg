import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import userActions from '../actions/UserActions'
import UserService from '../services/userService'

class UserStore extends EventEmitter {
    register (user) {
        UserService
        .register(user)
        .then(data => this.emit(this.eventTypes.USER_REGISTERED, data))
    }

    login (user) {
        UserService
        .login(user)
        .then(data => this.emit(this.eventTypes.USER_LOGGED_IN, data))
    }

    all () {
        UserService
        .all()
        .then(data => this.emit(this.eventTypes.USERS_RETRIEVED, data))
    }

    handleAction (action) {
        switch (action.type) {
            case userActions.types.REGISTER_USER: {
                this.register(action.user)
                break
            }
            case userActions.types.LOGIN_USER: {
                this.login(action.user)
                break
            }
            case userActions.types.ALL_USERS: {
                this.all()
                break
            }
            default: break
        }
    }
}

let userStore = new UserStore()

userStore.eventTypes = {
    USER_REGISTERED: 'user_registered',
    USER_LOGGED_IN: 'user_logged_in',
    USERS_RETRIEVED: 'users_retrieved'
}

dispatcher.register(userStore.handleAction.bind(userStore))
export default userStore

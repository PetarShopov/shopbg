import DataService from './dataService'
const baseUrl = 'users'

class UserService {
    static register(user) {
        return DataService.post(`${baseUrl}/register`, user)
    }

    static login(user) {
        return DataService.post(`${baseUrl}/login`, user)
    }

    static all() {
        return DataService.get(`analytics`,true)
    }
}

export default UserService

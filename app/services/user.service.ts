import User from '../models/user.model'

class UserService {
  getUser() {
    return User.findOne()
  }
}

export default new UserService()

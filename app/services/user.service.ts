import User from '../models/user.model'

class UserService {
  getUserById(id: number) {
    return User.findByPk(id)
  }

  getUserListByPage(page: number, limit = 15) {
    return User.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    })
  }

  getUserByUserInfo(code: string, password: string) {
    return User.findOne({
      where: {
        code,
        password,
      },
    })
  }

  getUserByUserCode(code: string) {
    return User.findOne({
      where: {
        code,
      },
    })
  }

  insert(user: { name: string; code: string; password: string }) {
    return User.create(user)
  }

  update(id: number, user: { name: string; code: string; password: string }) {
    return User.update(user, {
      where: {
        id,
      },
    })
  }

  delete(id: number) {
    return User.destroy({ where: { id } })
  }
}

export default new UserService()

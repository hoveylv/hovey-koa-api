import { Model } from 'sequelize-typescript'

function paginate<T extends Model[]>(data: T, currentPage = 1, total = 0, limit = 15) {
  return {
    data,
    currentPage,
    total,
    totalPage: Math.ceil(total / limit),
    limit,
  }
}

export default paginate

import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import config from '../config'
import { dbLogger } from '../logger'

const sequelize = new Sequelize(
  config.database?.db_name as string,
  config.database?.db_user as string,
  config.database?.db_pwd,
  {
    host: config.database?.db_host,
    port: config.database?.db_port as unknown as number,
    dialect: 'mysql',
    logging: msg => dbLogger.info(msg),
    models: [path.join(__dirname, '..', 'models/**/*.ts'), path.join(__dirname, '..', 'models/**/*.js')],
    dialectOptions: {
      charset: 'utf8mb4',
    },
    define: {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  }
)

const db = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
}

export default db

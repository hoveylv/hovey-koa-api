import { Sequelize } from 'sequelize-typescript'
import config from '../config'

const sequelize = new Sequelize(
  config.database?.db_name as string,
  config.database?.db_user as string,
  config.database?.db_pwd,
  {
    host: config.database?.db_host,
    port: config.database?.db_port as unknown as number,
    dialect: 'mysql',
  }
)

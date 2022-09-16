import type { Configuration } from 'log4js'

interface IConfig {
  server?: {
    port?: string
  }
  database?: {
    db_host?: string
    db_port?: string
    db_name?: string
    db_user?: string
    db_pwd?: string
  }
  log: Configuration
}

const config: IConfig = {
  server: {
    port: process.env.SERVER_PORT,
  },
  database: {
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_pwd: process.env.DB_PWD,
  },
  log: {
    appenders: {
      error: {
        type: 'file',
        filename: 'logs/errors.log',
      },
      access: {
        type: 'file',
        filename: 'logs/access.log',
      },
    },
    categories: {
      default: {
        appenders: ['error'],
        level: 'error',
      },
      access: {
        appenders: ['access'],
        level: 'info',
      },
    },
  },
}

export default config

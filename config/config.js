require('dotenv').config()

const config =
    {
      development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql'
      },
      production: {
        use_env_variable: 'CLEARDB_DATABASE_URL'
      }
    }

module.exports = config

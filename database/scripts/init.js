const { execSync } = require('child_process')
require('dotenv').config({ path: './.env' })

const enviorments = {
  dev: 'development',
  test: 'test',
  prod: 'production'
}

const argsEnv = enviorments[process.argv[2]]

const env = `--env ${argsEnv || process.env.ENVIORMENT || 'development'}`

execSync(`cd ./database && npx sequelize-cli db:drop ${env} && npx sequelize-cli db:create ${env} && npx sequelize-cli db:migrate ${env} && npx sequelize-cli db:seed:all ${env}`, { stdio: 'inherit' })

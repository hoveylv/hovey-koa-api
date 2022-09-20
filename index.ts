import { run } from './app'
import config from './app/config'

// console.log(config)

run(config.server?.port, () => {
  console.log(`server is running in ${config.server?.port}`)
})

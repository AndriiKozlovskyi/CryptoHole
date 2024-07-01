import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'

const pinia = createPinia()
const orm = createORM()

pinia.use(orm)

export default pinia

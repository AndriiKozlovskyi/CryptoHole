import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
import Tag from '@/models/tag_model'
import Project from '@/models/project_model'
import ProjectTag from '@/models/project_tag'

const pinia = createPinia()
const orm = createORM([Tag, Project, ProjectTag])

pinia.use(orm)

export default pinia

import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import Project from '@/models/project_model'
import ProjectApi from '@/api/project_api'
import ProjectResponse from '@/dtos/responses/project_response'
import _ from 'lodash'
import { ProjectRequest } from '@/dtos/requests/project_request'
import TagManager from './tag_manager'

export default class ProjectManager {
  protected static get repository() {
    return useRepo(Project, store)
  }

  static all(): Collection<Project> {
    return this.repository.all()
  }

  static getById(id: number): Project | null {
    return this.repository.find(id)
  }

  static async update(id: number, object: any) {
    const rest = _.omit(object, ['id'])
    const project = await ProjectApi.updateProject(id, rest)
    this.repository.where('id', id).update(project)
  }

  static async loadAll() {
    const response = await ProjectApi.getAllProjects()
    const projects = this.getFormatedProjects(response.data)

    this.repository.save(projects)
  }

  static async createProject(project: ProjectRequest) {
    const projectResponse = await ProjectApi.createProject(project)
    const projectRes = this.getFormatedProject(projectResponse)

    this.repository.save(projectRes)
  }

  static async deleteProject(id: number) {
    await ProjectApi.deleteProject(id)

    this.repository.destroy(id)
  }

  private static getFormatedProjects(projects: Array<ProjectResponse>) {
    const _this = this
    return projects.map((project) => {
      return _this.getFormatedProject(project)
    })
  }

  static getProjectByName(name: string) {
    return this.repository.where('name', name).first()
  }

  private static getFormatedProject(projectResponse: ProjectResponse) {
    return {
      id: projectResponse.id,
      name: projectResponse.name,
      tags: TagManager.getFormatedTags(projectResponse.tags),
      expenses: projectResponse.expenses,
      participants: projectResponse.participants,
      src: projectResponse.src,
      saved: projectResponse.saved
    }
  }
}

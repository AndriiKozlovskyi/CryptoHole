import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import Project from '@/models/project_model'
import ProjectApi from "@/api/project_api";
import ProjectResponse from '@/dtos/responses/project_response';


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
    this.repository.where('id', id).update(object);
    console.log(this.all())
  }

  static async loadAll() {
    const response = await ProjectApi.getAllProjects();
    const projects = await this.getFormatedProjects(response.data);

    this.repository.save(projects);
  }

  static async createProject(project: Project) {
    this.repository.save(project)
  }

  private static async getFormatedProjects(projects: Array<ProjectResponse>) {
    const _this = this
    return Promise.all(
      projects.map(async (project) => {
        return _this.getFormatedProject(project)
      })
    )
  }

  private static getFormatedProject(projectResponse: ProjectResponse) {
    return {
      id: projectResponse.id,
      name: projectResponse.name,
      tags: ["Game"],
      expenses: projectResponse.expenses,
      participants: projectResponse.text,
      src: projectResponse.src,
      saved: projectResponse.saved
    }
  }
}

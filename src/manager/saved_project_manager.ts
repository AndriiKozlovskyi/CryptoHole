import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import SavedProject from '@/models/saved_project_model';
import SavedProjectApi from "@/api/saved_project_api";
import { SavedProjectResponse } from '@/dtos/responses/saved_project_response';
import ProjectApi from "@/api/project_api";
import ProjectManager from './project_manager';

export default class SavedProjectManager {
  protected static get repository() {
    return useRepo(SavedProject, store)
  }

  static all(): Collection<SavedProject> {
    return this.repository.all()
  }

  static getById(id: number): SavedProject | null {
    return this.repository.find(id)
  }

  static async loadAll() {
    const response = await SavedProjectApi.getAllSavedProjects();
    const projects = await this.getFormatedProjects(response.data)
    this.repository.save(projects)
  }

  static async createProject(project: SavedProject) {
    this.repository.save(project)
  }
  static async saveProject(id: number) {
    const response = await ProjectApi.saveProject(id);
    const project = this.getFormatedProject(response.data);
    ProjectManager.update(id, {saved: true});
    this.repository.save(project);
  }


  static async unsaveProject(id: number) {
    await SavedProjectApi.unsaveProject(id);
    ProjectManager.update(id, {saved: false});
    this.repository.destroy(id);
  }

  private static async getFormatedProjects(projects: Array<SavedProjectResponse>) {
    const _this = this
    return Promise.all(
      projects.map(async (project) => {
        return _this.getFormatedProject(project)
      })
    )
  }

  private static getFormatedProject(projectResponse: SavedProjectResponse) {
    return {
      id: projectResponse.id,
      name: projectResponse.name,
      project: projectResponse.project,
      expenses: projectResponse.expenses,
      status: projectResponse.status,
      amountOfAccs: projectResponse.amountOfAccs
    }
  }
}

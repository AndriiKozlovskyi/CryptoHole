import { useRepo } from 'pinia-orm'
import store from '../store/store'
import SavedProject from '@/models/saved_project_model';
import SavedProjectApi from "@/api/saved_project_api";
import { SavedProjectResponse } from '@/dtos/responses/saved_project_response';
import ProjectApi from "@/api/project_api";
import ProjectManager from './project_manager';
import _ from 'lodash';

export default class SavedProjectManager {
  protected static get repository() {
    return useRepo(SavedProject, store)
  }

  static all(): SavedProject[] {
    return this.repository.all().sort((a, b) => a.orderNumber - b.orderNumber)
  }

  static getById(id: number) {
    return this.repository.where('id', id).first();
  }

  static async loadAll() {
    const response = await SavedProjectApi.getAllSavedProjects();
    const projects = this.getFormatedProjects(response.data)

    this.repository.save(projects)
  }

  static async createProject(project: SavedProject) {
    this.repository.save(project)
  }

  static async update(id: number, _savedProject: SavedProject) {
    const savedProjectRequest = this.getFormatedProject(_savedProject);
    const rest = _.omit(savedProjectRequest, ['id', 'project']);
    const savedProject = await SavedProjectApi.updateProject(id, rest);

    this.repository.where('id', id).update(savedProject.data);
  }

  static async saveProject(id: number) {
    const response = await ProjectApi.saveProject(id);
    const project = this.getFormatedProject(response.data);
    ProjectManager.update(id, {saved: true});
    this.repository.save(project);
  }

  static getSavedProjectByName(name: string) {
    return this.repository.where('name', name).first();
  }

  static async unsaveProject(id: number) {
    ProjectManager.update(id, {saved: false});
    const savedProjectId = this.repository.where('project', id).first().id;
    this.repository.destroy(savedProjectId);
    await SavedProjectApi.unsaveProject(id);

  }

  private static getFormatedProjects(projects: Array<SavedProjectResponse>) {
    const _this = this
  
    return projects.map((project) => {
        return _this.getFormatedProject(project)
    })
  }

  static updateOrderNumber(projectId: number, beforeProjectId: number) {
    const projectToChange = this.repository.where("id", projectId).first();

    if(beforeProjectId === null) {
      
      projectToChange.orderNumber = this.getLastOrderNumberForProject(projectToChange.status) + 1;
      this.update(projectToChange.id, projectToChange);
      return;
    }
    const projectToBeReplaced = this.repository.where("id", beforeProjectId).first();

    projectToChange.orderNumber = projectToBeReplaced.orderNumber;
    projectToBeReplaced.orderNumber ++;

    this.update(projectToChange.id, projectToChange);
    this.update(projectToBeReplaced.id, projectToBeReplaced);
  }

  static updateAll(savedProjects: SavedProject[]) {
    savedProjects = savedProjects.filter(project => delete project['pivot'])

    this.repository.flush();
    this.repository.save(savedProjects);
  }

  private static getFormatedProject(projectResponse: SavedProjectResponse) {
    return {
      id: projectResponse.id,
      name: projectResponse.name,
      project: projectResponse.project,
      expenses: projectResponse.expenses,
      status: projectResponse.status,
      amountOfAccs: projectResponse.amountOfAccs,
      orderNumber: projectResponse.orderNumber
    }
  }

  private static getLastOrderNumberForProject(status: string) {
    const projects = this.repository.where('status', status).get();
    if(projects.length == 1) {
      return -1;
    }
    return projects[0].orderNumber;
  }
}

import { useRepo, type Collection } from "pinia-orm";
import store from '../store/store'
import Project from "@/models/project_model";

export default class ProjectManager {
    protected static get repository() {
        return useRepo(Project, store)
    }

    static all(): Collection<Project> {
        return this.repository.all()
      }
    
    static async createProject(project: Project) {
        // const response = await CategoryApi.createBook(book, categoryId)
        // const bookEntity = this.getFormatedBook(response.data)

        this.repository.save(project)
    }

    private static getFormatedProject() {
        // return {
        //   id: book.id,
        //   name: book.name,
        //   author: book.author,
        //   style: book.style,
        //   text: book.text
        // }
      }
    
}
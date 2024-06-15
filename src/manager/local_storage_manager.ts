import type {Project} from '@/entity/Project';
import type {SavedProject} from '@/entity/saved_project';
import {emitter} from "@/event_bus";

export default class LocalStorageManager {
    public static getItem(key: string): any {
        return localStorage.getItem(key);
    }

    public static setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public static getProjects(): Project[] {
        const projects: Project[] = JSON.parse(this.getItem("projects"));
        return projects;
    }

    public static getSavedProjectByName(name: string): SavedProject {
        const projects: SavedProject[] = JSON.parse(this.getItem("savedProjects"));
        return projects.find(project => project.name === name);
    }


    public static setProjects(projects: Project[]) {
        this.setItem("projects", JSON.stringify(projects));
    }

    public static addProject(project: Project) {
        let recentProjects: Project[] = this.getProjects();
        if(recentProjects === null) {
            recentProjects = [];
        }
        recentProjects.push(project);
        this.setItem("projects", JSON.stringify(recentProjects));
    }

    public static saveProject(project: Project) {
        let recentProjects: SavedProject[] = this.getSavedProject();
        if(recentProjects === null) {
            recentProjects = [];
        }
        recentProjects.push({name: project.name, expenses: project.expenses, tag: project.tag, status: "todo"});
        this.setItem("savedProjects", JSON.stringify(recentProjects));
        emitter.emit("saveProject");

    }

    public static updateSavedProject(project: SavedProject) {
        let recentProjects: SavedProject[] = this.getSavedProject();
        if(recentProjects === null) {
            recentProjects = [];
        }

        const newProjects = recentProjects.map(_project => {
            if (project.name === _project.name) {
                return project;
            }
            return _project;

        });

        this.setItem("savedProjects", JSON.stringify(newProjects));
        emitter.emit("updateSavedProject");

    }

    public static isProjectSaved(project: Project) {
        let recentProjects: SavedProject[] = this.getSavedProject();
        if(recentProjects === null) {
            recentProjects = [];
        }
        return recentProjects.some(e => e.name === project.name);
    }

    public static unsaveProject(project: SavedProject) {
        let recentProjects: SavedProject[] = this.getSavedProject();
        if(recentProjects === null) {
            recentProjects = [];
        }
        recentProjects = recentProjects.filter(item => item.name !== project.name);

        this.setItem("savedProjects", JSON.stringify(recentProjects));
        emitter.emit("unsaveProject");
    }

    public static getSavedProject() {
        const projects: SavedProject[] = JSON.parse(this.getItem("savedProjects"));
        return projects;
    }
}
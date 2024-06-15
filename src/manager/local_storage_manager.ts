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

    public static setProjects(projects: Project[]) {
        this.setItem("projects", JSON.stringify(projects));
    }

    public static addProject(project: Project) {
        const recentProjects: Project[] = this.getProjects();
        recentProjects.push(project);
        this.setItem("projects", JSON.stringify(recentProjects));
    }

    public static saveProject(project: Project) {
        let recentProjects: Project[] = this.getSavedProject();
        if(recentProjects === null) {
            recentProjects = [];
        }
        recentProjects.push(project);
        this.setItem("savedProjects", JSON.stringify(recentProjects));
        emitter.emit("saveProject");

    }

    public static isProjectSaved(project: Project) {
        const recentProjects: Project[] = this.getSavedProject();
        return recentProjects.some(e => e.name === project.name);
    }

    public static unsaveProject(project: Saved) {
        let recentProjects: Project[] = this.getSavedProject();
        if(recentProjects === null) {
            recentProjects = [];
        }
        recentProjects = recentProjects.filter(item => item.name !== project.name);

        this.setItem("savedProjects", JSON.stringify(recentProjects));
        emitter.emit("unsaveProject");
    }

    public static getSavedProject() {
        const projects: Project[] = JSON.parse(this.getItem("savedProjects"));
        return projects;
    }
}
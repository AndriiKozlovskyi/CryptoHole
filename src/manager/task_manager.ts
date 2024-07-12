import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import _ from 'lodash'
import Task from '@/models/task_model'
import TaskApi from '@/api/task_api'
import TaskResponse from '@/dtos/responses/task_response'
import TaskRequest from '@/dtos/requests/task_request'
export default class TaskManager {
  protected static get repository() {
    return useRepo(Task, store)
  }

  static all(): Collection<Task> {
    return this.repository.all()
  }

  static getById(id: number): Task | null {
    return this.repository.find(id)
  }

  static async update(id: number, object: any) {
    const rest = _.omit(object, ['id'])
    const task = await TaskApi.updateTask(id, rest)
    const taskRequest: TaskRequest = task.data;
    this.repository.where('id', id).update(taskRequest)
  }

  static async loadAll(eventId: number) {
    const response = await TaskApi.allTasks(eventId)
    const tasks = this.getFormatedTasks(response.data)

    this.repository.save(tasks)
  }

  static async createTask(eventId: number, task: TaskRequest) {
    const taskResponse = await TaskApi.createTask(eventId, task)
    const taskResult = this.getFormatedTask(taskResponse.data)

    this.repository.save(taskResult)
  }

  static async deleteTask(id: number) {
    await TaskApi.deleteTask(id)

    this.repository.destroy(id)
  }

  public static getFormatedTasks(tasks: Array<TaskResponse>) {
    const _this = this
    return tasks.map((task) => {
      return _this.getFormatedTask(task)
    })
  }

  private static getFormatedTask(taskResponse: TaskResponse) {
    return {
      id: taskResponse.id,
      header: taskResponse.header,
      description: taskResponse.description
    }
  }
}

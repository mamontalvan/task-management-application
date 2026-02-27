import { observable, action, runInAction } from 'mobx';

export default class TasksStore {
  @observable tasks = [];
  @observable filters = { status: '', search: '' };

  constructor(tasksService) {
    this.tasksService = tasksService;
  }

  @action
  updateFilters({ status, search }) {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchTasks();
  }

  @action
  resetTasks() {
    this.tasks = [];
  }

  @action
  async fetchTasks() {
    const result = await this.tasksService.fetchTasks(this.filters);

    if (result) {
      runInAction(() => {
        // Clear existing tasks and add new ones to keep array observable
        this.tasks.length = 0;
        this.tasks.push(...result.data);
      });
    }
  }

  @action
  async createTask(title, description) {
    const result = await this.tasksService.createTask(title, description);

    if (result) {
      runInAction(() => {
        this.tasks.push(result.data);
      });
    }
  }

  @action
  async deleteTask(id) {
    const idx = this.tasks.findIndex(task => task.id === id);
    await this.tasksService.deleteTask(id);
    runInAction(() => {
      this.tasks.splice(idx, 1);
    });
  }

  @action
  async updateTaskStatus(id, status) {
    const task = this.tasks.find(task => task.id === id);
    await this.tasksService.updateTaskStatus(id, status);
    runInAction(() => {
      task.status = status;
    });
  }
}

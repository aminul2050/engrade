export class Task {
  taskId: number;
  taskState: string;
  startDate: string;
  constructor(taskId: number, taskState: string, startDate: string) {
    this.taskId = taskId;
    this.taskState = taskState;
    this.startDate = startDate;
  }
}

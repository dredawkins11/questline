export interface Task {
    prompt: string,
    text: string,
    subTasks: Task[],
    completed: boolean
}
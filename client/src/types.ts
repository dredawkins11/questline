export interface Quest {
    prompt: string;
    title: string;
    description: string;
    tasks: Task[];
    id: string;
}

export interface Task {
    text: string;
    completed: boolean;
}
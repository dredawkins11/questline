import { AlertColor } from "@mui/material";

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

export interface AlertObject {
    severity: AlertColor
    message: string
}
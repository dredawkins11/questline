export interface Quest {
    prompt: string;
    text: string;
    parent?: string;
    completed: boolean;
    id: string;
}

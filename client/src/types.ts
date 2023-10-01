export interface Quest {
    prompt: string,
    text: string,
    subQuests: Quest[],
    completed: boolean,
    id: string
}
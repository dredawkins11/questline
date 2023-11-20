import { Quest } from "../types";

interface ServerResponse extends Quest {
    
}

export const generateQuest = async (
    prompt: string,
    taskAmount: number = 5
) => {
    try {
        // const res = await fetch(`/quest`, {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/quest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                taskAmount: taskAmount,
                goal: prompt,
            }),
        });
        if (res.status == 400) {
            throw new Error("Bad Prompt");
        }
        const data: ServerResponse = await res.json()
        const quest: Quest = {...data, id: randomId()}
        return { quest };

    } catch (error) {
        console.log(error);
        return { error };
    }
};

export const randomId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

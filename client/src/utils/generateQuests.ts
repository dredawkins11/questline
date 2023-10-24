import { Quest } from "../types";

interface QuestResponseBody {
    steps: string[];
}

export const generateQuests = async (
    prompt: string,
    parent: string,
    amount: number = 5
) => {
    const generatedQuests: Quest[] = [];
    try {
        // const res = await fetch(`/quest`, {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/quest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                stepAmount: amount,
                task: prompt,
            }),
        });
        if (res.status == 400) {
            throw new Error("Bad Prompt");
        }
        const data: QuestResponseBody = await res.json();

        data?.steps.forEach((step) => {
            const subQuest = {
                prompt: prompt,
                text: step,
                parent: parent,
                completed: false,
                id: `${randomId()}`,
            };
            generatedQuests.push(subQuest);
        });
    } catch (error) {
        console.log(error);
        return { error };
    }
    return { generatedQuests };
};

export const randomId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

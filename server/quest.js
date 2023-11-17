import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import fs from "fs";

const openAiKey = process.env.OPENAI_API_KEY;
if (openAiKey == undefined) throw new Error("No API Key");

const openAIInput = {
    openAIApiKey: openAiKey,
    temperature: 0,
    modelName: "gpt-3.5-turbo",
};

const model = new OpenAI(openAIInput);

const promptText = fs.readFileSync("./Prompt.txt", "utf-8");

const promptFunc = async (input, taskAmount) => {
    const prompt = new PromptTemplate({
        template: promptText,
        inputVariables: ["goal", "taskAmount"],
    });

    try {
        const promptInput = await prompt.format({
            goal: input,
            taskAmount: taskAmount,
        });
        const res = await model.call(promptInput);
        if (res == "Not understood.") return false;
        return { goal: input, quest: res };
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const newQuest = async (prompt, taskAmount) => {
    const {goal, quest} = await promptFunc(prompt, taskAmount);
    if (!quest) throw new Error("Not understood.")
    let {title, description, tasks} = JSON.parse(quest)
    tasks = tasks.map(task => ({text: task, completed: false}))
    const questObject = {prompt: goal, title, description, tasks};
    console.log(questObject);
    return questObject;
};

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const model = new OpenAI({
    openAiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: "gpt-3.5-turbo",
});

const promptFunc = async (input, stepAmount) => {
    const prompt = new PromptTemplate({
        template:
            "You are an assistant that will help me break down a task into discrete steps I can take to accomplish it. You will break down the task into {stepAmount} short, simple, sub-tasks that are easier to complete. These sub-tasks should be no longer than 20 words long. The list of sub-tasks should not contain any pronouns. The sentences do not need to be grammatically correct. If you do not understand the task, or cannot provide reasonably specific steps, simply respond with: 'Not understood.' Here is the task:\n{question}",
        inputVariables: ["question", "stepAmount"],
    });

    try {
        const promptInput = await prompt.format({
            question: input,
            stepAmount: stepAmount
        });
        const res = await model.call(promptInput);
        if (res == "Not understood.") return false
        return { task: input, steps: res };
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const newQuest = async (prompt, stepAmount) => {
    const rawResponse = await promptFunc(prompt, stepAmount);
    console.log("raw", rawResponse);
    if (!rawResponse) throw new Error("Prompt not understood");

    const questObject = { task: rawResponse.task, steps: [] };

    const splitSteps = rawResponse.steps.split("\n");
    splitSteps.forEach((step) => {
        if (step == "") return;
        const formattedStep = step.split(".")[1];
        questObject.steps.push(formattedStep.trim());
    });

    return questObject;
};

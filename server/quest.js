import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const model = new OpenAI({
    openAiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: "gpt-3.5-turbo",
});

const promptFunc = async (input) => {
    const prompt = new PromptTemplate({
        template:
            "You are an assistant that will help me break down a task into discrete steps I can take to accomplish it. You will break down the task into 5-10 short, simple, sub-tasks that are easier to complete. These sub-tasks should be no longer than 20 words long. The list of sub-tasks should not contain any pronouns. The sentences do not need to be grammatically correct. Here is the task:\n{question}",
        inputVariables: ["question"],
    });

    try {
        const promptInput = await prompt.format({
            question: input,
        });
        console.log(promptInput)
        const res = await model.call(promptInput);
        return {task: input, steps: res}
    } catch (error) {
        console.log(error);
        return error
    }
};

export const newQuest = async (prompt) => {
    const rawResponse = await promptFunc(prompt)
    const questObject = {task: rawResponse.task, steps: []}
    const splitSteps = rawResponse.steps.split("\n")
    splitSteps.forEach(step => {
        if (step == "") return
        const formattedStep = step.split(".")[1]
        questObject.steps.push(formattedStep.trim())
    })
    return questObject;
}
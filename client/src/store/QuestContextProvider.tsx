import { createContext, useEffect, useState } from "react";
import { Quest } from "../types";

const randomId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

const searchQuest = (
    quest: Quest,
    targetId: string,
    i: number,
    path: number[] = []
): number[] | undefined => {
    if (quest.id === targetId) {
        path.push(i);
        return path;
    }
    if (quest.subQuests.length > 0) path.push(i);
    for (let i = 0; i < quest.subQuests.length; i++) {
        const result = searchQuest(quest.subQuests[i], targetId, i, path);
        if (result) return result;
    }
};

const STEP_AMOUNT = 3;

interface QuestResponseBody {
    steps: string[];
}

interface QuestContext {
    loading: boolean;
    quests: Quest[];
    addQuest: (questPrompt: string) => void;
    editQuest: (quest: Quest, id: string) => void;
    deleteQuest: (id: string) => void;
}

const QuestContext = createContext<QuestContext>({
    loading: false,
    quests: [],
    addQuest: (questPrompt: string) => {},
    editQuest: (quest: Quest, id: string) => {},
    deleteQuest: (id: string) => {},
});

interface QuestContextProviderProps {
    children: React.ReactNode;
}

const QuestContextProvider = ({ children }: QuestContextProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [quests, setQuests] = useState<Quest[]>([]);

    const storedQuests: string | null = localStorage.getItem("quests");
    useEffect(() => {
        if (storedQuests == null) return;
        setQuests(JSON.parse(storedQuests));
    }, [storedQuests]);

    const addQuest = async (questPrompt: string) => {
        const newQuest: Quest = {
            prompt: questPrompt,
            text: questPrompt,
            subQuests: [],
            completed: false,
            id: `${randomId()}`,
        };

        setLoading(true);
        try {
            const res = await fetch("/quest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepAmount: STEP_AMOUNT,
                    task: questPrompt,
                }),
            });
            if (res.status == 400) {
                setLoading(false);
                // return setErrorMessage("Bad Prompt");
            }
            const data: QuestResponseBody = await res.json();
            data?.steps.forEach((subQuest) => {
                const quest = {
                    prompt: questPrompt,
                    text: subQuest,
                    subQuests: [],
                    completed: false,
                    id: `${randomId()}`,
                };
                newQuest.subQuests.push(quest);
            });
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        setQuests((prevState) => {
            const quests = [...prevState, newQuest];
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const editQuest = (quest: Quest, id: string) => {
        setQuests((prevState) => {
            const quests = [...prevState];

            let targetPath: number[] = [];
            let searching = true;
            for (let i = 0; i < quests.length && searching; i++) {
                const searchResult = searchQuest(quests[i], id, i);
                if (searchResult) {
                    searching = false;
                    targetPath = searchResult;
                }
            }
            let targetQuest: Quest = quests[targetPath[0]];
            for (let i = 1; i < targetPath.length; i++) {
                targetQuest = targetQuest.subQuests[targetPath[i]];
            }

            targetQuest = quest;
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const deleteQuest = (id: string) => {
        setQuests((prevState) => {
            const quests = prevState.filter((quest) => quest.id != id);
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    return (
        <QuestContext.Provider
            value={{ loading, quests, addQuest, editQuest, deleteQuest }}
        >
            {children}
        </QuestContext.Provider>
    );
};
export { QuestContextProvider, QuestContext };

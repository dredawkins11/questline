import { createContext, useEffect, useState } from "react";
import { Quest } from "../types";

const randomId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

const STEP_AMOUNT = 10;

interface QuestResponseBody {
    steps: string[];
}

interface QuestContext {
    loading: boolean;
    quests: Quest[];
    getChildren: (id: string, onlyIds?: boolean) => Quest[];
    getChildrenIds: (id: string) => string[]
    addQuest: (questPrompt: string, parent?: string) => void;
    editQuest: (quest: Quest, id: string) => void;
    deleteQuest: (id: string) => void;
}

const QuestContext = createContext<QuestContext>({
    loading: false,
    quests: [],
    getChildren: (id: string, onlyIds?: boolean) => [],
    getChildrenIds: (id: string) => [],
    addQuest: (questPrompt: string, parent?: string) => {},
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

    const addQuest = async (questPrompt: string, parent?: string) => {
        const newQuest: Quest = {
            prompt: questPrompt,
            text: questPrompt,
            completed: false,
            id: `${randomId()}`,
        };
        const subQuests: Quest[] = [];
        if (parent) newQuest.parent = parent;

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
            data?.steps.forEach((step) => {
                const subQuest = {
                    prompt: questPrompt,
                    text: step,
                    parent: newQuest.id,
                    completed: false,
                    id: `${randomId()}`,
                };
                subQuests.push(subQuest);
            });
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        setQuests((prevState) => {
            const quests = [...prevState, newQuest, ...subQuests];
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const editQuest = (quest: Quest, id: string) => {
        setQuests((prevState) => {
            const quests = [...prevState];
            const targetQuest = quests.findIndex((quest) => quest.id === id);
            quests[targetQuest] = quest;
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const deleteQuest = (id: string) => {
        const childrenIds = getChildrenIds(id);
        const filterIds = [id, ...childrenIds];
        console.log(filterIds);
        const filteredQuests = quests.filter(
            (quest) => !filterIds.includes(quest.id)
        );
        localStorage.setItem("quests", JSON.stringify(filteredQuests));
        setQuests(filteredQuests);
    };

    const getChildren = (id: string, onlyIds?: boolean) =>
        quests.filter((quest) => quest.parent === id);

    const getChildrenIds = (id: string) =>
        quests.filter((quest) => quest.parent === id).map((quest) => quest.id);

    return (
        <QuestContext.Provider
            value={{
                loading,
                quests,
                getChildren,
                getChildrenIds,
                addQuest,
                editQuest,
                deleteQuest,
            }}
        >
            {children}
        </QuestContext.Provider>
    );
};
export { QuestContextProvider, QuestContext };

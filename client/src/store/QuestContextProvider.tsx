import { createContext, useEffect, useState } from "react";
import { Quest } from "../types";


interface QuestContextProviderProps {
    children: React.ReactNode;
}

interface QuestContext {
    loading: boolean;
    quests: Quest[];
    getChildren: (id: string) => Quest[];
    getChildrenIds: (id: string) => string[];
    addQuests: (quests: Quest | Quest[]) => void;
    editQuest: (quest: Quest, id: string) => void;
    deleteQuest: (id: string) => void;
}

const QuestContext = createContext<QuestContext>({
    loading: false,
    quests: [],
    getChildren: (id: string) => [],
    getChildrenIds: (id: string) => [],
    addQuests: (quests: Quest | Quest[]) => {},
    editQuest: (quest: Quest, id: string) => {},
    deleteQuest: (id: string) => {},
});

const QuestContextProvider = ({ children }: QuestContextProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [quests, setQuests] = useState<Quest[]>([]);

    const storedQuests: string | null = localStorage.getItem("quests");
    useEffect(() => {
        if (storedQuests == null) return;
        setQuests(JSON.parse(storedQuests));
    }, [storedQuests]);

    const addQuests = async (quests: Quest | Quest[]) => {
        let newQuests: Quest[]
        newQuests = Array.isArray(quests) ? [...quests] : [quests]
        
        setQuests((prevState) => {
            const quests = [...prevState, ...newQuests];
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
        const descendantIds = getDescendants(id);

        const filterIds = [id, ...descendantIds];
        const filteredQuests = quests.filter(
            (quest) => !filterIds.includes(quest.id)
        );
        localStorage.setItem("quests", JSON.stringify(filteredQuests));
        setQuests(filteredQuests);
    };

    const getChildren = (id: string) =>
        quests.filter((quest) => quest.parent === id);

    const getChildrenIds = (id: string) =>
        quests.filter((quest) => quest.parent === id).map((quest) => quest.id);

    const getDescendants = (id: string) => {
        const descendants: string[] = []
        const children: string[] = getChildrenIds(id)

        if (!children) return descendants
        
        children.forEach(child => {
            descendants.push(child)
            getDescendants(child).forEach(descendant => descendants.push(descendant))
        })

        return descendants
    }

    return (
        <QuestContext.Provider
            value={{
                loading,
                quests,
                getChildren,
                getChildrenIds,
                addQuests,
                editQuest,
                deleteQuest,
            }}
        >
            {children}
        </QuestContext.Provider>
    );
};
export { QuestContextProvider, QuestContext };

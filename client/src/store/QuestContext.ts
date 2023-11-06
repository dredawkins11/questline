import { createContext } from "react";
import { Quest } from "../types";

interface QuestContext {
    // loading: boolean;
    quests: Quest[];
    selectedQuest: Quest | null;
    addQuests: (quests: Quest | Quest[]) => void;
    editQuest: (quest: Quest, id: string) => void;
    deleteQuest: (id: string) => void;
    clearQuests: () => void
    selectQuest: (id: string) => void
}

const QuestContext = createContext<QuestContext>({
    // loading: false,
    quests: [],
    selectedQuest: null,
    addQuests: (_quests: Quest | Quest[]) => {},
    editQuest: (_quest: Quest, _id: string) => {},
    deleteQuest: (_id: string) => {},
    clearQuests: () => {},
    selectQuest: (_id: string) => {},
});


export default QuestContext
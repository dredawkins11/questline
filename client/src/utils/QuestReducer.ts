import { Quest } from "../types";

interface QuestState {
    quests: Quest[];
    selectedQuest: Quest | null;
}

interface AddAction {
    type: "ADD_QUEST";
    payload: Quest;
}
interface EditAction {
    type: "EDIT_QUEST";
    payload: { id: string; quest: Quest };
}
interface DeleteAction {
    type: "DELETE_QUEST";
    payload: string;
}
interface SelectAction {
    type: "SELECT_QUEST";
    payload: string;
}
interface LoadAction {
    type: "LOAD_QUESTS"
    payload: Quest[]
}
interface ClearAction {
    type: "CLEAR_QUESTS";
}

type QuestAction =
    | AddAction
    | EditAction
    | DeleteAction
    | SelectAction
    | LoadAction
    | ClearAction;

export default function (
    state: QuestState,
    action: QuestAction
): QuestState {
    const { quests, selectedQuest } = state;
    const { type } = action;
    if (type == "ADD_QUEST") {
        const newQuests = [...quests, action.payload];
        return { quests: newQuests, selectedQuest };
    }
    if (type == "EDIT_QUEST") {
        const newQuests = [...quests];
        const targetQuest = quests.findIndex(
            (quest) => quest.id === action.payload.id
        );
        newQuests[targetQuest] = action.payload.quest;
    }
    if (type == "DELETE_QUEST") {
        const newQuests = quests.filter(
            (quest) => quest.id != action.payload
        );
        return { quests: newQuests, selectedQuest };
    }
    if (type == "SELECT_QUEST") {
        const targetQuest = quests.find(
            (quest) => quest.id == action.payload
        );
        return { quests, selectedQuest: targetQuest ? targetQuest : null };
    }
    if (type == "LOAD_QUESTS") {
        return {quests: action.payload, selectedQuest}
    }
    if (type == "CLEAR_QUESTS") {
        return { quests: [], selectedQuest: null };
    }
    return state;
}

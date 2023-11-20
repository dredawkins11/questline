import { Quest } from "../types";

interface QuestState {
    quests: Quest[];
    selectedQuestId: string | null;
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
    const { quests, selectedQuestId } = state;
    const { type } = action;
    if (type == "ADD_QUEST") {
        const newQuests = [...quests, action.payload];
        return { quests: newQuests, selectedQuestId: selectedQuestId };
    }
    if (type == "EDIT_QUEST") {
        const newQuests = quests.slice();
        const targetQuest = quests.findIndex(
            (quest) => quest.id === action.payload.id
            );
        newQuests.splice(targetQuest, 1, action.payload.quest)
        return { quests: newQuests, selectedQuestId: selectedQuestId };
    }
    if (type == "DELETE_QUEST") {
        const newQuests = quests.filter(
            (quest) => quest.id != action.payload
        );
        return { quests: newQuests, selectedQuestId: selectedQuestId };
    }
    if (type == "SELECT_QUEST") {
        let targetQuest = quests.find(
            (quest) => quest.id == action.payload
        );
        if (targetQuest?.id == selectedQuestId) targetQuest = undefined
        return { quests, selectedQuestId: targetQuest ? targetQuest.id : null };
    }
    if (type == "LOAD_QUESTS") {
        return {quests: action.payload, selectedQuestId: selectedQuestId}
    }
    if (type == "CLEAR_QUESTS") {
        return { quests: [], selectedQuestId: null };
    }
    return state;
}

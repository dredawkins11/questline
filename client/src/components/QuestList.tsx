import { Stack } from "@mui/material";
import ParentQuestItem from "./ParentQuestItem";
import { useContext, useState } from "react";
import QuestItem from "./QuestItem";
import QuestSkeleton from "./QuestSkeleton";
import { Quest } from "../types";
import QuestDetails from "./QuestDetails";
import QuestContext from "../store/QuestContext";

interface QuestListProps {
    loading: boolean;
}

const QuestList = ({ loading }: QuestListProps) => {
    const { quests, selectQuest } = useContext(QuestContext);

    return (
        <Stack
            sx={(theme) => ({
                width: 1,
                height: 1,
                padding: 3,
                gap: 3,
                overflowY: "scroll",
            })}
        >
            {quests.map((quest) => (
                <QuestItem
                    key={quest.id}
                    quest={quest}
                    onSelect={selectQuest}
                />
            ))}
        </Stack>
    );
};
export default QuestList;

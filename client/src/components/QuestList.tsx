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
    const {quests, selectQuest } = useContext(QuestContext);


    return (
        <Stack width={1} height={1} sx={{ overflowY: "scroll" }} padding={1}>
            {quests.map((quest) => (
                <QuestItem
                    key={quest.id}
                    questTitle={quest.title}
                    questId={quest.id}
                    onSelect={selectQuest}
                />
            ))}
        </Stack>
    );
};
export default QuestList;

import { Stack } from "@mui/material";
import QuestItem from "./QuestItem";
import { Quest } from "../types";
import QuestSkeleton from "./QuestSkeleton";

interface QuestListProps {
    loading: boolean;
    quests: Quest[]
    onSelectQuest: (id: string) => void
}

const QuestList = ({ loading, quests, onSelectQuest }: QuestListProps) => {
    return (
        <Stack
            sx={{
                width: 1,
                height: 1,
                padding: 3,
                gap: 3,
                overflowY: "scroll",
            }}
        >
            {quests.map((quest) => {
                console.log(quest.tasks[quest.tasks.length -1]);
                return(
                <QuestItem
                    key={quest.id}
                    quest={quest}
                    onSelect={onSelectQuest}
                    
                />
            )})}
            {loading && <QuestSkeleton/>}
        </Stack>
    );
};
export default QuestList;

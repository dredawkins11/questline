import { Stack } from "@mui/material";
import QuestItem from "./QuestItem";
import { Quest } from "../types";
import QuestSkeleton from "./QuestSkeleton";

interface QuestListProps {
    loading: boolean;
    quests: Quest[];
    showProgress: boolean;
    onSelectQuest: (id: string) => void;
}

const QuestList = ({
    loading,
    quests,
    showProgress,
    onSelectQuest,
}: QuestListProps) => {
    return (
        <Stack
            sx={{
                width: 1,
                height: 1,
                // padding: 3,
                // gap: 3,
                overflowY: "scroll",
            }}
        >
            {quests.map((quest) => {
                return (
                    <QuestItem
                        key={quest.id}
                        quest={quest}
                        onSelect={onSelectQuest}
                        showProgress={showProgress}
                    />
                );
            })}
            {loading && <QuestSkeleton />}
        </Stack>
    );
};
export default QuestList;

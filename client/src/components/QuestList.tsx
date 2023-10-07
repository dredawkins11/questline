import { Stack } from "@mui/material";
import Quest from "./Quest";

interface QuestListProps {
    quests: Quest[],
    onEditQuest: (quest: Quest, id: string) => void;
    onDeleteQuest: (id: string) => void;
}

const QuestList = ({ quests, onEditQuest, onDeleteQuest}: QuestListProps) => {
    return (
        <Stack
            width={1}
            height={0.8}
            marginTop={3}
            sx={{ overflowY: "scroll" }}
            padding={1}
        >
            {quests.map((quest) => (
                <Quest key={quest.id} quest={quest} onEditQuest={onEditQuest} onDeleteQuest={onDeleteQuest} />
            ))}
        </Stack>
    );
};
export default QuestList;

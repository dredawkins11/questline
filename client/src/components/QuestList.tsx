import { Stack } from "@mui/material";
import Quest from "./Quest";

interface QuestListProps {
    quests: Quest[],
    onEditQuest: (questText: string, id: string) => void;
}

const QuestList = ({ quests, onEditQuest }: QuestListProps) => {
    return (
        <Stack
            width={1}
            height={0.8}
            marginTop={3}
            sx={{ overflowY: "scroll" }}
            padding={1}
        >
            {quests.map((quest, i) => (
                <Quest key={i} quest={quest} onEditQuest={onEditQuest} />
            ))}
        </Stack>
    );
};
export default QuestList;

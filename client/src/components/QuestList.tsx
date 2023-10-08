import { Box, Skeleton, Stack } from "@mui/material";
import Quest from "./Quest";

interface QuestListProps {
    quests: Quest[];
    onEditQuest: (quest: Quest, id: string) => void;
    onDeleteQuest: (id: string) => void;
    loading: boolean;
}

const QuestList = ({
    quests,
    onEditQuest,
    onDeleteQuest,
    loading,
}: QuestListProps) => {
    return (
        <Stack
            width={1}
            height={0.8}
            marginTop={3}
            sx={{ overflowY: "scroll" }}
            padding={1}
        >
            {quests.map((quest) => (
                <Quest
                    key={quest.id}
                    quest={quest}
                    onEditQuest={onEditQuest}
                    onDeleteQuest={onDeleteQuest}
                />
            ))}
            {loading && (
                <Box display="flex" alignItems="center" gap={2}>
                    <Skeleton variant="rounded" sx={{ aspectRatio: "1/1", height: "3rem" }} />
                    <Skeleton variant="text" sx={{flexGrow: 10 }} />
                    <Skeleton variant="rounded" sx={{flexGrow: 1, height: "2rem" }} />
                </Box>
            )}
        </Stack>
    );
};
export default QuestList;

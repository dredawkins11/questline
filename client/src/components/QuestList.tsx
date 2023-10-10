import { Box, Skeleton, Stack } from "@mui/material";
import Quest from "./Quest";
import { useContext } from "react";
import { QuestContext } from "../store/QuestContextProvider";

interface QuestListProps {}

const QuestList = ({}: QuestListProps) => {
    const { loading, quests, getChildren, editQuest, deleteQuest } =
        useContext(QuestContext);
    return (
        <Stack
            width={1}
            height={0.8}
            marginTop={3}
            sx={{ overflowY: "scroll" }}
            padding={1}
        >
            {quests.map((quest) => {
                if (quest.parent) return
                return (
                    <Quest
                        key={quest.id}
                        quest={quest}
                        children={getChildren(quest.id)}
                        onEditQuest={editQuest}
                        onDeleteQuest={deleteQuest}
                    />
                );
            })}
            {loading && (
                <Box display="flex" alignItems="center" gap={2}>
                    <Skeleton
                        variant="rounded"
                        sx={{ aspectRatio: "1/1", height: "3rem" }}
                    />
                    <Skeleton variant="text" sx={{ flexGrow: 10 }} />
                    <Skeleton
                        variant="rounded"
                        sx={{ flexGrow: 1, height: "2rem" }}
                    />
                </Box>
            )}
        </Stack>
    );
};
export default QuestList;

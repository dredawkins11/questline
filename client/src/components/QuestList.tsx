import { Box, Skeleton, Stack } from "@mui/material";
import ParentQuestItem from "./ParentQuestItem";
import { useContext } from "react";
import { QuestContext } from "../store/QuestContextProvider";
import QuestItem from "./QuestItem";

interface QuestListProps {}

const QuestList = ({}: QuestListProps) => {
    const { loading, quests, getChildren } =
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
                const questChildren = getChildren(quest.id);
                if (questChildren.length == 0) return <QuestItem key={quest.id} quest={quest} />
                
                    return (
                        <ParentQuestItem
                            key={quest.id}
                            quest={quest}
                            children={questChildren}
                        />
                    )
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

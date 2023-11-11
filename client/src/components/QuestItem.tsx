import {
    Box,
    Stack,
    Typography,
} from "@mui/material";
import { Quest } from "../types";

interface QuestItemProps {
    quest: Quest;
    onSelect: (id: string) => void;
}

const QuestItem = ({ quest, onSelect }: QuestItemProps) => {

    return (
        <>
            <Box
                onClick={() => onSelect(quest.id)}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={
                    {
                        // backgroundColor: () => {
                        //     if (parentCompleted) return "rgba(0,0,0,0)";
                        //     if (addingSubQuest) return "action.hover";
                        //     return "background.paper";
                        // },
                        // position: "relative",
                        // height: "3rem",
                        // "&::before": {
                        //     position: "absolute",
                        //     left: 0,
                        //     right: 0,
                        //     top: "-1px",
                        //     height: "1px",
                        //     content: '""',
                        //     opacity: 1,
                        //     userSelect: "text",
                        //     backgroundColor: "rgba(255, 255, 255, 0.12)",
                        //     transition:
                        //         "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        // },
                    }
                }
            >
                <Stack direction="column">
                    <Typography variant="h5">{quest.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{quest.prompt}</Typography>
                </Stack>
            </Box>
        </>
    );
};
export default QuestItem;

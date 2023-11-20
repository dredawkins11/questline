import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Quest } from "../types";

interface QuestItemProps {
    quest: Quest;
    showProgress: boolean;
    onSelect: (id: string) => void;
}

const QuestItem = ({ quest, showProgress, onSelect }: QuestItemProps) => {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const amountCompleted = quest.tasks.filter((task) => task.completed).length;

    return (
        <>
            <Box
                onClick={() => onSelect(quest.id)}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    paddingX: 3,
                    paddingY: 1.5,
                    userSelect: "none",
                    transition: "background-color .2s",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }
                }}
            >
                <Stack direction="column">
                    <Typography variant="h5">{quest.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {quest.prompt}
                    </Typography>
                </Stack>
                {!smallScreen && showProgress && (
                    <Stack>
                        <Typography variant="h5" textAlign="right">
                            {Math.round(
                                (amountCompleted / quest.tasks.length) * 100
                            )}
                            %
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            completed
                        </Typography>
                    </Stack>
                )}
            </Box>
        </>
    );
};
export default QuestItem;

import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Quest } from "../types";
import Line from "./ui/Line";
import QuestTask from "./QuestTask";
import { Close, Edit } from "@mui/icons-material";

interface QuestDetailsProps {
    quest: Quest;
    onEditQuest: (id: string, quest: Quest) => void
    onSelectQuest: (id: string) => void
}

const QuestDetails = ({ quest, onSelectQuest }: QuestDetailsProps) => {

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <Box
                sx={{
                    height: 1,
                    overflowY: "scroll",
                }}
            >
                <Stack position="relative" gap={3} paddingX={3}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                    >
                        <IconButton
                            size="small"
                            onClick={() => onSelectQuest("")}
                        >
                            <Close />
                        </IconButton>
                        {!smallScreen && (
                            <Line direction="horizontal" flow="row" />
                        )}
                        <Typography variant="h6" textAlign="center">
                            {quest.title}
                        </Typography>
                        {!smallScreen && (
                            <Line direction="horizontal" flow="row" />
                        )}
                        <IconButton size="small">
                            <Edit />
                        </IconButton>
                    </Stack>
                    <Typography variant="body2" textAlign="justify">
                        {quest.description}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={3}>
                        <Line direction="horizontal" flow="row" />
                        <Typography variant="h6">Tasks</Typography>
                        <Line direction="horizontal" flow="row" />
                    </Stack>
                    <Stack mb={8}>
                        {quest.tasks.map((task, i) => (
                            <QuestTask
                                key={i}
                                task={task}
                                last={i == quest.tasks.length - 1}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Box>
            <Stack
                sx={(theme) => ({
                    flexDirection: "row",
                    justifyContent: "space-around",
                    position: "absolute",
                    bottom: 0,
                    width: 1,
                    height: 0.1,
                    backgroundColor: theme.palette.background.paper,
                })}
            >
                <Button>Regenerate Tasks</Button>
                <Line direction="vertical" flow="row" />
                <Button>Add New Task</Button>
            </Stack>
        </>
    );
};
export default QuestDetails;

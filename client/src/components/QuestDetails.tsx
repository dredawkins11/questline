import { Button, Stack, Typography } from "@mui/material";
import { Quest } from "../types";
import Line from "./ui/Line";
import QuestTask from "./QuestTask";

interface QuestDetailsProps {
    quest: Quest;
}

const QuestDetails = ({ quest }: QuestDetailsProps) => {
    return (
        <Stack position="relative" gap={3} padding={3}>
            <Typography variant="h5">{quest.title}</Typography>
            <Typography>{quest.description}</Typography>
            <Stack direction="row" alignItems="center" gap={3}>
                <Typography variant="h5">Tasks</Typography>
                <Line
                    direction="horizontal"
                    flow="row"
                    sx={(theme) => ({
                        backgroundColor: theme.palette.text.primary,
                    })}
                />
                {/* <Line direction="horizontal" flow="row"/> */}
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
    );
};
export default QuestDetails;

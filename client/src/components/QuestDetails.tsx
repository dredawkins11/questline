import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Quest, Task } from "../types";
import Line from "./ui/Line";
import QuestTask from "./QuestTask";
import { Add, Close, Edit } from "@mui/icons-material";
import { ChangeEventHandler, useEffect, useState } from "react";

interface QuestDetailsProps {
    quest: Quest;
    onEditQuest: (id: string, quest: Quest) => void;
    onSelectQuest: (id: string) => void;
}

const QuestDetails = ({
    quest,
    onSelectQuest,
    onEditQuest,
}: QuestDetailsProps) => {
    const [editing, setEditing] = useState(false);
    const [titleText, setTitleText] = useState(quest.title);
    const [descriptionText, setDescriptionText] = useState(quest.description);
    const [tasks, setTasks] = useState(quest.tasks);

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const newQuest = {
            ...quest,
            title: titleText,
            descriptionText: descriptionText,
            tasks: tasks,
        };
        onEditQuest(quest.id, newQuest);
    }, [titleText, descriptionText, tasks]);

    const handleAddTask = () => {
        const newQuest = {
            ...quest,
            tasks: [...quest.tasks, { text: "New task...", completed: false }],
        };
        onEditQuest(quest.id, newQuest);
    };

    const handleTaskChange = (index: number, task: Task) => {
        const newTasks = [...tasks];
        newTasks[index] = task;
        setTasks(newTasks);
    };

    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const text = e.target.value;

        setTitleText(text);
    };

    const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        const text = e.target.value;

        setDescriptionText(text);
    };

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
                        {!smallScreen && !editing && (
                            <Line direction="horizontal" flow="row" />
                        )}
                        {editing ? (
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={titleText}
                                onChange={handleTitleChange}
                                sx={(theme) => ({
                                    "& .MuiInputBase-root": {
                                        ...theme.typography.h6,
                                        "&::before": {
                                            bottom: -3,
                                        },
                                        "&::after": {
                                            bottom: -3,
                                        },
                                        "& input": {
                                            textAlign: "center",
                                            paddingY: 0.2,
                                        },
                                    },
                                })}
                            />
                        ) : (
                            <Typography variant="h6" textAlign="center">
                                {titleText}
                            </Typography>
                        )}

                        {!smallScreen && !editing && (
                            <Line direction="horizontal" flow="row" />
                        )}
                        <IconButton
                            size="small"
                            onClick={() => setEditing((prev) => !prev)}
                        >
                            <Edit />
                        </IconButton>
                    </Stack>
                    {editing ? (
                        <TextField
                            multiline
                            value={descriptionText}
                            onChange={handleDescriptionChange}
                            sx={(theme) => ({
                                "& .MuiInputBase-root": {
                                    paddingX: 1,
                                    paddingY: 1,
                                    ...theme.typography.body2,
                                    "&::before": {
                                        bottom: -3,
                                    },
                                    "&::after": {
                                        bottom: -3,
                                    },
                                    "& textarea": {
                                        paddingY: 0.2,
                                        textAlign: "justify",
                                    },
                                },
                            })}
                        />
                    ) : (
                        <Typography
                            variant="body2"
                            textAlign="justify"
                            paddingY={1}
                            paddingX={1}
                            mb={"10px"}
                        >
                            {quest.description}
                        </Typography>
                    )}

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
                                onEdit={handleTaskChange.bind(null, i)}
                                last={i == quest.tasks.length - 1}
                                editing={editing}
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
                <Button onClick={() => handleAddTask()}>
                    Add New Task
                    <Add />
                </Button>
            </Stack>
        </>
    );
};
export default QuestDetails;

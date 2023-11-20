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
import { Add, Check, Close, Delete, Edit } from "@mui/icons-material";
import { ChangeEventHandler, useEffect, useState } from "react";

interface QuestDetailsProps {
    quest: Quest;
    onEditQuest: (id: string, quest: Quest) => void;
    onDeleteQuest: (id: string) => void;
    onSelectQuest: (id: string) => void;
}

const QuestDetails = ({
    quest,
    onEditQuest,
    onDeleteQuest,
    onSelectQuest,
}: QuestDetailsProps) => {
    const [editing, setEditing] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [descriptionText, setDescriptionText] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        setEditing(false);
        setTitleText(quest.title);
        setDescriptionText(quest.description);
        setTasks(quest.tasks);
    }, [quest.id]);

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

    const handleDeleteTask = (index: number) => {
        console.log(index);

        const newTasks = [...tasks];
        newTasks.splice(index, 1);
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
                    {/* Title */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                    >
                        {editing ? (
                            <>
                                <IconButton
                                    size="small"
                                    onClick={() => onDeleteQuest(quest.id)}
                                >
                                    <Delete />
                                </IconButton>
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
                                <IconButton
                                    size="small"
                                    onClick={() => setEditing((prev) => !prev)}
                                >
                                    <Check />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    size="small"
                                    onClick={() => onSelectQuest("")}
                                >
                                    <Close />
                                </IconButton>
                                {!smallScreen && (
                                    <Line direction="horizontal" flow="row" />
                                )}
                                <Typography
                                    variant="h6"
                                    textAlign="center"
                                    maxWidth={smallScreen ? 1 : 0.5}
                                >
                                    {quest.title}
                                </Typography>
                                {!smallScreen && (
                                    <Line direction="horizontal" flow="row" />
                                )}
                                <IconButton
                                    size="small"
                                    onClick={() => setEditing((prev) => !prev)}
                                >
                                    <Edit />
                                </IconButton>
                            </>
                        )}
                    </Stack>

                    {/* Description */}
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

                    {/* Tasks */}
                    <Stack mb={8}>
                        {quest.tasks.map((task, i) => (
                            <QuestTask
                                key={task.text + i}
                                task={task}
                                onEdit={handleTaskChange.bind(null, i)}
                                onDelete={handleDeleteTask.bind(null, i)}
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
                    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
                    background: `linear-gradient(0deg, ${theme.palette.background.paper} 50%, rgba(0,0,0,0) 100%)`,
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

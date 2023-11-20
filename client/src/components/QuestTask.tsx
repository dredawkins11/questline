import { Close } from "@mui/icons-material";
import {
    Checkbox,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import IconMenu from "./ui/IconMenu";
import Line from "./ui/Line";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Task } from "../types";

interface QuestTaskProps {
    task: Task;
    last: boolean;
    editing: boolean;
    onEdit: (task: Task) => void;
    onDelete: () => void
}

const QuestTask = ({ task, last, editing, onEdit, onDelete }: QuestTaskProps) => {
    const [taskText, setTaskText] = useState(task.text);
    const [completed, setCompleted] = useState(task.completed);

    useEffect(() => {
        onEdit({ text: taskText, completed });
    }, [taskText, completed]);

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const text = e.target.value;
        setTaskText(text);
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
        >
            <Stack direction="column" alignItems="center" alignSelf="stretch">
                <Checkbox
                    sx={{ padding: 0 }}
                    checked={completed}
                    onChange={() => setCompleted((prev) => !prev)}
                />
                {!last && <Line direction="vertical" flow="column" />}
            </Stack>
            {editing ? (
                <>
                    <TextField
                        variant="standard"
                        fullWidth
                        multiline
                        value={taskText}
                        onChange={handleTextChange}
                        sx={(theme) => ({
                            "& .MuiInputBase-root": {
                                ...theme.typography.body2,
                                padding: 0,
                                "&::before": {
                                    bottom: 3,
                                },
                                "&::after": {
                                    bottom: -3,
                                },
                                "& input": {
                                    paddingY: 0.2,
                                },
                            },
                        })}
                    ></TextField>
                    <IconMenu>
                        <IconButton onClick={onDelete}>
                            <Close />
                        </IconButton>
                    </IconMenu>
                </>
            ) : (
                <Typography variant="body2" flexGrow={1} mb={2}>
                    {taskText}
                </Typography>
            )}
        </Stack>
    );
};
export default QuestTask;

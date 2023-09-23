import { Container, Stack, TextField, Typography } from "@mui/material";
import TaskList from "./components/TaskList";

const first = {
    prompt: "I need you to help me do this task",
    text: "Do this first",
    subTasks: [],
    completed: false,
};

const next = {
    prompt: "I need you to help me do this task",
    text: "Do this first",
    subTasks: [],
    completed: true,
};

const last = {
    prompt: "I need you to help me do this task",
    text: "Do this first",
    subTasks: [],
    completed: false,
};

const DUMMY_TASKS = [
    {
        prompt: "I need you to help me do this task",
        text: "Task Name",
        subTasks: [first, next, last],
        completed: true,
    },
    {
        prompt: "I need you to help me do this task",
        text: "Task Name",
        subTasks: [first, next, last],
        completed: false,
    },
    {
        prompt: "I need you to help me do this task",
        text: "Task Name",
        subTasks: [first, next, last],
        completed: false,
    },
    {
        prompt: "I need you to help me do this task",
        text: "Task Name",
        subTasks: [first, next, last],
        completed: false,
    },
    {
        prompt: "I need you to help me do this task",
        text: "Task Name",
        subTasks: [first, next, last],
        completed: false,
    },
];

function App() {
    return (
        <Container maxWidth="sm">
            <Stack alignItems="center" sx={{ mt: 4 }}>
                <Typography variant="h4">Type a task below:</Typography>
                <TextField />
                <TaskList tasks={DUMMY_TASKS} />
            </Stack>
        </Container>
    );
}

export default App;

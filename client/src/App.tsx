import { Box, Container, Stack, Typography } from "@mui/material";
import QuestList from "./components/QuestList";
import QuestForm from "./components/QuestForm";
import { useEffect, useState } from "react";
import { Quest } from "./types";

const first = {
    prompt: "I need you to help me do this quest",
    text: "Do this first",
    subQuests: [],
    completed: false,
    id: "6",
};

const next = {
    prompt: "I need you to help me do this quest",
    text: "Do this next",
    subQuests: [],
    completed: true,
    id: "7",
};

const last = {
    prompt: "I need you to help me do this quest",
    text: "Do this last",
    subQuests: [],
    completed: false,
    id: "8",
};

const nested = {
    prompt: "This is a nested quest",
    text: "Quest Name",
    subQuests: [first, next, last],
    completed: true,
    id: "9",
};

const DUMMY_TASKS = [
    {
        prompt: "I need you to help me do this quest",
        text: "Quest Name1",
        subQuests: [first, next, last],
        completed: true,
        id: "1",
    },
    {
        prompt: "I need you to help me do this quest",
        text: "Quest Name2",
        subQuests: [],
        completed: false,
        id: "2",
    },
    {
        prompt: "I need you to help me do this quest",
        text: "Quest Name3",
        subQuests: [first, next, nested, last],
        completed: false,
        id: "3",
    },
    {
        prompt: "I need you to help me do this quest",
        text: "Quest Name4",
        subQuests: [first, next, last],
        completed: false,
        id: "4",
    },
    {
        prompt: "I need you to help me do this quest",
        text: "Quest Name5",
        subQuests: [first, next, last],
        completed: false,
        id: "5",
    },
];

function App() {
    // const fetchQuest = async () => {
    //     const res = await fetch("/quest", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             task: "Do the dishes"
    //         })
    //     })
    //     return res
    // }
    // console.log(fetchQuest())
    const [quests, setQuests] = useState<Quest[]>([]);

    useEffect(() => {
        const storedQuests: string | null = localStorage.getItem("quests");
        if (storedQuests == null) return;
        setQuests(JSON.parse(storedQuests));
    }, [quests]);

    const addQuest = (questPrompt: string) => {
        const newQuest = {
            prompt: questPrompt,
            text: questPrompt,
            subQuests: [],
            completed: false,
            id: `${quests.length + 1}`,
        };
        setQuests((prevState) => {
            const quests = [...prevState, newQuest];
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const editQuest = (questText: string, id: string) => {
        setQuests((prevState) => {
            const targetQuest = prevState.find((quest) => quest.id == id);
            if (targetQuest) {
                targetQuest.text = questText;
            }
            localStorage.setItem("quests", JSON.stringify(prevState));
            return prevState;
        });
    };

    const deleteQuest = (id: string) => {
        setQuests((prevState) => {
            const quests = prevState.filter((quest) => quest.id != id);
            localStorage.setItem("quests", JSON.stringify(quests))
            return quests
        });
    };

    return (
        <Container maxWidth="sm" sx={{ height: "100vh" }}>
            <Stack height="100vh" alignItems="center">
                <Typography variant="h4" margin={5}>
                    Quest<strong>Line</strong>
                </Typography>
                <Box width={1} maxHeight={1} overflow="hidden">
                    <QuestForm onAddQuest={addQuest} />
                    <QuestList
                        quests={quests}
                        onEditQuest={editQuest}
                        onDeleteQuest={deleteQuest}
                    />
                </Box>
            </Stack>
        </Container>
    );
}

export default App;

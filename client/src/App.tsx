import {
    Box,
    Button,
    Container,
    Modal,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import QuestList from "./components/QuestList";
import QuestForm from "./components/QuestForm";
import { useEffect, useState } from "react";
import { Quest } from "./types";

// const first = {
//     prompt: "I need you to help me do this quest",
//     text: "Do this first",
//     subQuests: [],
//     completed: false,
//     id: "6",
// };

// const next = {
//     prompt: "I need you to help me do this quest",
//     text: "Do this next",
//     subQuests: [],
//     completed: true,
//     id: "7",
// };

// const last = {
//     prompt: "I need you to help me do this quest",
//     text: "Do this last",
//     subQuests: [],
//     completed: false,
//     id: "8",
// };

// const nested = {
//     prompt: "This is a nested quest",
//     text: "Quest Name",
//     subQuests: [first, next, last],
//     completed: true,
//     id: "9",
// };

// const DUMMY_TASKS = [
//     {
//         prompt: "I need you to help me do this quest",
//         text: "Quest Name1",
//         subQuests: [first, next, last],
//         completed: true,
//         id: "1",
//     },
//     {
//         prompt: "I need you to help me do this quest",
//         text: "Quest Name2",
//         subQuests: [],
//         completed: false,
//         id: "2",
//     },
//     {
//         prompt: "I need you to help me do this quest",
//         text: "Quest Name3",
//         subQuests: [first, next, nested, last],
//         completed: false,
//         id: "3",
//     },
//     {
//         prompt: "I need you to help me do this quest",
//         text: "Quest Name4",
//         subQuests: [first, next, last],
//         completed: false,
//         id: "4",
//     },
//     {
//         prompt: "I need you to help me do this quest",
//         text: "Quest Name5",
//         subQuests: [first, next, last],
//         completed: false,
//         id: "5",
//     },
// ];

const randomId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

const searchQuest = (
    quest: Quest,
    targetId: string,
    i: number,
    path: number[] = []
): number[] | undefined => {
    if (quest.id === targetId) {
        path.push(i);
        return path;
    }
    if (quest.subQuests.length > 0) path.push(i);
    for (let i = 0; i < quest.subQuests.length; i++) {
        const result = searchQuest(quest.subQuests[i], targetId, i, path);
        if (result) return result;
    }
};

const STEP_AMOUNT = 3;

interface QuestResponseBody {
    steps: string[];
}

function App() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const storedQuests: string | null = localStorage.getItem("quests");
    useEffect(() => {
        if (storedQuests == null) return;
        setQuests(JSON.parse(storedQuests));
    }, [storedQuests]);

    const addQuest = async (questPrompt: string) => {
        const newQuest: Quest = {
            prompt: questPrompt,
            text: questPrompt,
            subQuests: [],
            completed: false,
            id: `${randomId()}`,
        };

        setLoading(true);
        try {
            const res = await fetch("/quest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepAmount: STEP_AMOUNT,
                    task: questPrompt,
                }),
            });
            if (res.status == 400) {
                setLoading(false);
                return setErrorMessage("Bad Prompt");
            }
            const data: QuestResponseBody = await res.json();
            data?.steps.forEach((subQuest) => {
                const quest = {
                    prompt: questPrompt,
                    text: subQuest,
                    subQuests: [],
                    completed: false,
                    id: `${randomId()}`,
                };
                newQuest.subQuests.push(quest);
            });
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        setQuests((prevState) => {
            const quests = [...prevState, newQuest];
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const editQuest = (quest: Quest, id: string) => {
        setQuests((prevState) => {
            const quests = [...prevState];

            let targetPath: number[] = [];
            let searching = true;
            for (let i = 0; i < quests.length && searching; i++) {
                const searchResult = searchQuest(quests[i], id, i);
                if (searchResult) {
                    searching = false;
                    targetPath = searchResult;
                }
            }
            let targetQuest: Quest = quests[targetPath[0]];
            for (let i = 1; i < targetPath.length; i++) {
                targetQuest = targetQuest.subQuests[targetPath[i]]
            }
            
            targetQuest = quest;
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const deleteQuest = (id: string) => {
        setQuests((prevState) => {
            const quests = prevState.filter((quest) => quest.id != id);
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
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
                        loading={loading}
                    />
                </Box>
            </Stack>
            <Modal open={errorMessage != null}>
                <Container
                    maxWidth="sm"
                    sx={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 10,
                            width: 0.7,
                            padding: 3,
                            gap: 2,
                        }}
                    >
                        <Typography variant="h4" textAlign="center">
                            {errorMessage}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setErrorMessage(null)}
                        >
                            Okay
                        </Button>
                    </Paper>
                </Container>
            </Modal>
        </Container>
    );
}

export default App;

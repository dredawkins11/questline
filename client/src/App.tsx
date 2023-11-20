import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import QuestList from "./components/QuestList";
import { useEffect, useReducer, useState } from "react";
import {
    Add,
    Info as InfoIcon,
    MenuBook,
    // Settings as SettingsIcon,
} from "@mui/icons-material";
import IconMenu from "./components/ui/IconMenu";
import QuestDetails from "./components/QuestDetails";
import TabMenu from "./components/ui/TabMenu";
import QuestForm from "./components/QuestForm";
import QuestReducer from "./utils/QuestReducer";
import { AlertObject, Quest } from "./types";
import AboutModal from "./components/AboutModal";

function App() {
    // Fetch quest data from local storage (can be null)
    const questData: string | null = localStorage.getItem("quests");

    // If there are no quests in local storage, save empty array, else grab those quests
    const savedQuests =
        questData == null || questData == "" ? [] : JSON.parse(questData);

    // Destructure state from reducer, initial state is the saved quests and null selected quest
    const [{ quests, selectedQuestId }, dispatch] = useReducer(QuestReducer, {
        quests: savedQuests,
        selectedQuestId: null,
    });

    const [displayQuests, setDisplayQuests] = useState([...quests]); // Displayed quests, will be filtered
    const [tab, setTab] = useState(0); // Which tab is selected
    const [loading, setLoading] = useState(false); // Whether a quest is loading
    const [adding, setAdding] = useState(false); // Whether a quest is being added
    const [alert, setAlert] = useState<AlertObject | null>(null); // Manage current alert, if any
    const [aboutOpen, setAboutOpen] = useState(false); // Manage about modal

    // Currently open quest
    let selectedQuest = quests.find((quest) => quest.id == selectedQuestId);
    selectedQuest = selectedQuest ? selectedQuest : undefined;

    // Based on selected tab, filter the quests
    useEffect(() => {
        if (selectedQuest) return;
        setDisplayQuests(() => {
            if (tab == 1)
                return quests.filter((quest) =>
                    quest.tasks.some((task) => !task.completed)
                );
            if (tab == 2)
                return quests.filter((quest) =>
                    quest.tasks.every((task) => task.completed)
                );
            return quests;
        });
    }, [tab, quests, selectedQuest]);

    // Save quests to local storage each time they change
    useEffect(() => {
        localStorage.setItem("quests", JSON.stringify(quests));
    }, [quests]);

    // Handle different mutations to state with reducer dispatch functions
    const handleSelectQuest = (target: string) => {
        setAdding(false);
        dispatch({ type: "SELECT_QUEST", payload: target });
    };
    const handleAddQuest = (quest: Quest) => {
        setAdding(false);
        dispatch({ type: "ADD_QUEST", payload: quest });
        setAlert({
            severity: "success",
            message: "Quest added successfully!",
        });
    };
    const handleEditQuest = (id: string, quest: Quest) => {
        dispatch({ type: "EDIT_QUEST", payload: { id, quest } });
    };
    const handleDeleteQuest = (id: string) => {
        dispatch({ type: "DELETE_QUEST", payload: id });
        setAlert({
            severity: "info",
            message: "Quest deleted",
        });
    };
    const handleClearQuests = () => {
        dispatch({ type: "CLEAR_QUESTS" });
        setAlert({
            severity: "info",
            message: "All quests cleared",
        });
    };
    const handleAlertClose = () => {
        setAlert(null);
    };

    return (
        <>
            <Container
                sx={{
                    height: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "stretch",
                    paddingY: 3,
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={3}
                >
                    <Stack direction="row" gap={1}>
                        <MenuBook />
                        <Typography>QuestLine</Typography>
                    </Stack>
                    <IconMenu>
                        <IconButton onClick={() => setAboutOpen(true)}>
                            <InfoIcon />
                        </IconButton>
                    </IconMenu>
                </Box>
                <TabMenu
                    tab={tab}
                    onChangeTab={(value: number) => {
                        setTab(value);
                        handleSelectQuest("");
                    }}
                />
                <Paper
                    sx={{
                        position: "relative",
                        display: "flex",
                        gap: 1,
                        flexGrow: 1,
                        width: 1,
                    }}
                >
                    <Box
                        sx={(theme) => ({
                            position: "relative",
                            width: selectedQuest != null || adding ? 0.5 : 1,
                            [theme.breakpoints.down("md")]: {
                                width: 1,
                            },
                        })}
                    >
                        <QuestList
                            loading={loading}
                            quests={displayQuests}
                            onSelectQuest={handleSelectQuest}
                            showProgress={
                                !(selectedQuest != undefined || adding)
                            }
                        />
                        {!adding && (
                            <Button
                                onClick={() => {
                                    handleSelectQuest("");
                                    setAdding(true);
                                }}
                                sx={(theme) => ({
                                    position: "absolute",
                                    bottom: theme.spacing(2),
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                })}
                            >
                                New Quest <Add />
                            </Button>
                        )}
                    </Box>
                    {(selectedQuest || adding) && (
                        <Box
                            sx={(theme) => ({
                                position: "absolute",
                                right: 0,
                                width: 1,
                                height: 1,
                                [theme.breakpoints.up("md")]: {
                                    width: 0.5,
                                },
                            })}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: 1,
                                    height: 1,
                                    paddingY: 2,
                                }}
                            >
                                {selectedQuest ? (
                                    <QuestDetails
                                        quest={selectedQuest}
                                        onEditQuest={handleEditQuest}
                                        onDeleteQuest={handleDeleteQuest}
                                        onSelectQuest={handleSelectQuest}
                                    />
                                ) : (
                                    <QuestForm
                                        onAddQuest={handleAddQuest}
                                        onClose={() => setAdding(false)}
                                        onAlert={(alert: AlertObject) =>
                                            setAlert(alert)
                                        }
                                        loading={loading}
                                        setLoading={(value: boolean) =>
                                            setLoading(value)
                                        }
                                    />
                                )}
                            </Paper>
                        </Box>
                    )}
                </Paper>
            </Container>
            {alert != null && (
                <Snackbar
                    open={alert != null}
                    autoHideDuration={5000}
                    onClose={handleAlertClose}
                >
                    <Alert severity={alert.severity}>{alert.message}</Alert>
                </Snackbar>
            )}
            <AboutModal
                open={aboutOpen}
                onCloseAbout={() => setAboutOpen(false)}
            />
        </>
    );
}

export default App;

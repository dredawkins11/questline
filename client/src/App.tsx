import { Box, Button, Container, IconButton, Paper } from "@mui/material";
import QuestList from "./components/QuestList";
import { useEffect, useReducer, useState } from "react";
import {
    Add,
    Info as InfoIcon,
    // Settings as SettingsIcon,
} from "@mui/icons-material";
import IconMenu from "./components/ui/IconMenu";
import QuestDetails from "./components/QuestDetails";
import TabMenu from "./components/ui/TabMenu";
import QuestForm from "./components/QuestForm";
import QuestReducer from "./utils/QuestReducer";
import { Quest } from "./types";

function App() {
    const questData: string | null = localStorage.getItem("quests");
    const savedQuests =
        questData == null || questData == "" ? [] : JSON.parse(questData);
    const [{ quests, selectedQuestId }, dispatch] = useReducer(QuestReducer, {
        quests: savedQuests,
        selectedQuestId: null,
    });
    let selectedQuest = quests.find(quest => quest.id == selectedQuestId)
    selectedQuest = selectedQuest ? selectedQuest : undefined

    useEffect(() => {
        localStorage.setItem("quests", JSON.stringify(quests));
    }, [quests]);

   
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(0);
    const [adding, setAdding] = useState(false);

    const handleSelectQuest = (target: string) => {
        setAdding(false);
        dispatch({ type: "SELECT_QUEST", payload: target });
    };
    const handleAddQuest = (quest: Quest) => {
        dispatch({ type: "ADD_QUEST", payload: quest });
    };
    const handleEditQuest = (id: string, quest: Quest) => {
        dispatch({ type: "EDIT_QUEST", payload: { id, quest } });
    };
    const handleDeleteQuest = (id: string) => {
        dispatch({ type: "DELETE_QUEST", payload: id });
    };
    const handleClearQuests = () => {
        dispatch({ type: "CLEAR_QUESTS" });
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
                    pb: 3,
                }}
            >
                <Box>
                    <IconMenu>
                        <IconButton
                            onClick={handleClearQuests}
                        >
                            <InfoIcon />
                        </IconButton>
                    </IconMenu>
                </Box>
                <TabMenu
                    tab={tab}
                    onChangeTab={(value: number) => setTab(value)}
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
                            quests={quests}
                            onSelectQuest={handleSelectQuest}
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
                                        onSelectQuest={handleSelectQuest}
                                        onEditQuest={handleEditQuest}
                                    />
                                ) : (
                                    <QuestForm
                                        onAddQuest={handleAddQuest}
                                        onClose={() => setAdding(false)}
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
            {/* <ErrorModal />
                <AboutModal
                    open={aboutOpen}
                    onCloseAbout={() => setAboutOpen(false)}
                /> */}
        </>
    );
}

export default App;
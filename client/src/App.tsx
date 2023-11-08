import {
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Stack,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import QuestList from "./components/QuestList";
import { useContext, useState } from "react";
import {
    Add,
    Info as InfoIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";
import IconMenu from "./components/ui/IconMenu";
import QuestContextProvider from "./store/QuestContextProvider";
import QuestContext from "./store/QuestContext";
import QuestDetails from "./components/QuestDetails";
import Line from "./components/ui/Line";
import TabMenu from "./components/ui/TabMenu";
import QuestForm from "./components/QuestForm";

function App() {
    const [loading, setLoading] = useState(false);
    const { selectedQuest, selectQuest } = useContext(QuestContext);

    const [tab, setTab] = useState(0);
    const [adding, setAdding] = useState(false);

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.up("md"));

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
                            onClick={() => setAboutOpen((prev) => !prev)}
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
                        <QuestList loading={loading} />
                        {!adding && (
                            <Button
                                onClick={() => {
                                    selectQuest(null)
                                    setAdding(true)
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
                                sx={(theme) => ({
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: 1,
                                    height: 1,
                                    paddingY: 2,
                                })}
                            >
                                {selectedQuest ? (
                                    <QuestDetails quest={selectedQuest} />
                                ) : (
                                    <QuestForm
                                        onClose={() => setAdding(false)}
                                        setLoading={(value: boolean) =>
                                            setLoading(value)
                                        }
                                    />
                                )}
                            </Paper>
                        </Box>
                    )}
                    {/* <QuestList loading={loading} />
                    <Button>
                        New Quest <Add />
                    </Button>
                    {selectedQuest && !adding && (
                        <>
                            <Paper
                                elevation={3}
                                sx={(theme) => ({
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: 1,
                                    height: 1,
                                    paddingBottom: 1,
                                    [theme.breakpoints.up("md")]: {
                                        width: 0.5,
                                    },
                                })}
                            >
                                <Box
                                    sx={{
                                        height: 1,
                                        overflowY: "scroll",
                                    }}
                                >
                                    <QuestDetails quest={selectedQuest} />
                                </Box>
                            </Paper>
                            <Paper
                                sx={(theme) => ({
                                    display: "flex",
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    width: 1,
                                    height: theme.spacing(8),
                                    [theme.breakpoints.up("md")]: {
                                        width: 0.5,
                                    },
                                    backgroundColor:
                                        theme.palette.background.paper,
                                    overflowY: "scroll",
                                })}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="space-around"
                                    width={1}
                                >
                                    <Button>Regenerate Tasks</Button>
                                    <Line direction="vertical" flow="row" />
                                    <Button>Add New Task</Button>
                                </Stack>
                            </Paper>
                        </>
                    )}
                    {!selectedQuest && adding && (
                        <QuestForm
                            setLoading={(value: boolean) => setLoading(value)}
                        />
                    )} */}
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

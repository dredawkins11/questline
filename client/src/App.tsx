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
    Info as InfoIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";
import IconMenu from "./components/ui/IconMenu";
import QuestContextProvider from "./store/QuestContextProvider";
import QuestContext from "./store/QuestContext";
import QuestDetails from "./components/QuestDetails";
import Line from "./components/ui/Line";

function App() {
    const { selectedQuest } = useContext(QuestContext);

    const [tab, setTab] = useState(0);
    // const largeScreen = useMediaQuery(theme.breakpoints.up("md"))

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
                <Box>
                    <Tabs
                        variant="fullWidth"
                        value={tab}
                        onChange={(_, value) => setTab(value)}
                    >
                        <Tab label="All Quests" />
                        <Tab label="Incomplete" />
                        <Tab label="Completed" />
                    </Tabs>
                </Box>
                <Paper sx={{ position: "relative", flexGrow: 1, width: 1 }}>
                    <QuestList loading={false} />

                    {selectedQuest && (
                        <>
                            <Paper
                                sx={(theme) => ({
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: 1,
                                    height: 1,
                                    overflowY: "scroll",
                                    [theme.breakpoints.up("md")]: {
                                        width: 0.5,
                                    },
                                })}
                            >
                                <QuestDetails quest={selectedQuest} />
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

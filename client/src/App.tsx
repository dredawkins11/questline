import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import QuestList from "./components/QuestList";
import QuestForm from "./components/QuestForm";
import { useState } from "react";
import { QuestContextProvider } from "./store/QuestContextProvider";
import ErrorModal from "./components/ui/ErrorModal";
import SettingsMenu from "./components/SettingsMenu";
import {
    Info as InfoIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";
import AboutModal from "./components/AboutModal";
import IconMenu from "./components/ui/IconMenu";

function App() {
    const [loading, setLoading] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    return (
        <Container maxWidth="sm" sx={{ height: "100vh" }}>
            <QuestContextProvider>
                <Stack height="100vh" alignItems="center">
                    <Typography variant="h4" margin={5}>
                        Quest<strong>Line</strong>
                    </Typography>
                    <Box width={1} maxHeight={1} overflow="hidden">
                        <QuestForm
                            setLoading={(value: boolean) => {
                                setLoading(value);
                            }}
                        />
                        <QuestList loading={loading} />
                    </Box>
                </Stack>
                <Box position="absolute" top={"3vh"} left={"3vh"}>
                    <IconMenu>
                        <IconButton
                            onClick={() => setSettingsOpen((prev) => !prev)}
                        >
                            <SettingsIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => setAboutOpen((prev) => !prev)}
                        >
                            <InfoIcon />
                        </IconButton>
                    </IconMenu>
                </Box>
                <ErrorModal />
                <SettingsMenu
                    open={settingsOpen}
                    onCloseSettings={() => setSettingsOpen(false)}
                />
                <AboutModal
                    open={aboutOpen}
                    onCloseAbout={() => setAboutOpen(false)}
                />
            </QuestContextProvider>
        </Container>
    );
}

export default App;

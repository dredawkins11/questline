import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import QuestList from "./components/QuestList";
import QuestForm from "./components/QuestForm";
import { useContext, useState } from "react";
import { QuestContextProvider } from "./store/QuestContextProvider";
import ErrorModal from "./components/ui/ErrorModal";
import { AppContext } from "./store/AppContextProvider";
import SettingsMenu from "./components/SettingsMenu";
import { Settings } from "@mui/icons-material";

function App() {
    const { error } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

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
                <IconButton
                    onClick={() => setSettingsOpen((prev) => !prev)}
                    sx={{ position: "absolute", top: 10, left: 10 }}
                >
                    <Settings />
                </IconButton>
                {error && <ErrorModal />}
                {settingsOpen && (
                    <SettingsMenu
                        onCloseSettings={() => setSettingsOpen(false)}
                    />
                )}
            </QuestContextProvider>
        </Container>
    );
}

export default App;

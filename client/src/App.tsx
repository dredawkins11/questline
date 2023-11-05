import {
    Box,
    Container,
    CssBaseline,
    IconButton,
    Stack,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import QuestList from "./components/QuestList";
import QuestForm from "./components/QuestForm";
import { useContext, useMemo, useState } from "react";
import { QuestContextProvider } from "./store/QuestContextProvider";
import ErrorModal from "./components/ui/ErrorModal";
import SettingsMenu from "./components/SettingsMenu";
import {
    Info as InfoIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";
import AboutModal from "./components/AboutModal";
import IconMenu from "./components/ui/IconMenu";
import { AppContext } from "./store/AppContextProvider";

function App() {
    const { darkMode } = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            "*::-webkit-scrollbar": {
                                width: "3px",
                            },
                            "*::-webkit-scrollbar-track": {
                                WebkitBoxShadow:
                                    "inset 0 0 6px rgba(0,0,0,0.00)",
                            },
                            "*::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(255,255,255,.1)",
                                border: "0 0 solid black",
                                borderRadius: "5px",
                            },
                        },
                    },
                },
            }),
        [darkMode]
    );


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
        </ThemeProvider>
    );
}

export default App;

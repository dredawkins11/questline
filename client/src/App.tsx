import { Box, Container, Stack, Typography } from "@mui/material";
import QuestList from "./components/QuestList";
import QuestForm from "./components/QuestForm";
import { useState } from "react";
import { QuestContextProvider } from "./store/QuestContextProvider";
import ErrorModal from "./components/ui/ErrorModal";

function App() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSetErrorMessage = (value: string | null) => {
        setErrorMessage(value);
    };

    return (
        <Container maxWidth="sm" sx={{ height: "100vh" }}>
            <Stack height="100vh" alignItems="center">
                <Typography variant="h4" margin={5}>
                    Quest<strong>Line</strong>
                </Typography>
                <Box width={1} maxHeight={1} overflow="hidden">
                    <QuestContextProvider>
                        <QuestForm
                            setErrorMessage={onSetErrorMessage}
                            setLoading={(value: boolean) => {
                                setLoading(value);
                            }}
                        />
                        <QuestList
                            setErrorMessage={onSetErrorMessage}
                            loading={loading}
                        />
                    </QuestContextProvider>
                </Box>
            </Stack>
            {errorMessage && (
                <ErrorModal
                    errorMessage={errorMessage}
                    setErrorMessage={onSetErrorMessage}
                />
            )}
        </Container>
    );
}

export default App;

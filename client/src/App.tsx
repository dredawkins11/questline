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
import { useState } from "react";
import { QuestContextProvider } from "./store/QuestContextProvider";

function App() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    return (
        <Container maxWidth="sm" sx={{ height: "100vh" }}>
            <Stack height="100vh" alignItems="center">
                <Typography variant="h4" margin={5}>
                    Quest<strong>Line</strong>
                </Typography>
                <Box width={1} maxHeight={1} overflow="hidden">
                    <QuestContextProvider>
                        <QuestForm />
                        <QuestList />
                    </QuestContextProvider>
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

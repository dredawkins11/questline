import { Box, Container, Stack, Typography } from "@mui/material";
import QuestList from "./components/QuestList";
import QuestForm from "./components/QuestForm";
import { useContext, useState } from "react";
import { QuestContextProvider } from "./store/QuestContextProvider";
import ErrorModal from "./components/ui/ErrorModal";
import { AppContext } from "./store/AppContextProvider";

function App() {
    const { error } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    return (
        <Container maxWidth="sm" sx={{ height: "100vh" }}>
            <Stack height="100vh" alignItems="center">
                <Typography variant="h4" margin={5}>
                    Quest<strong>Line</strong>
                </Typography>
                <Box width={1} maxHeight={1} overflow="hidden">
                    <QuestContextProvider>
                        <QuestForm
                            setLoading={(value: boolean) => {
                                setLoading(value);
                            }}
                        />
                        <QuestList loading={loading} />
                    </QuestContextProvider>
                </Box>
            </Stack>
            {error && <ErrorModal />}
        </Container>
    );
}

export default App;

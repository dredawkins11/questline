import { AutoAwesome } from "@mui/icons-material";
import { Box, Button, TextField, ToggleButton, Tooltip } from "@mui/material";
import { useState, FormEventHandler, useContext } from "react";
import { QuestContext } from "../store/QuestContextProvider";
import { generateQuests, randomId } from "../utils/generateQuests";
import { Quest } from "../types";

interface QuestFormProps {
    setLoading: (value: boolean) => void;
    setErrorMessage: (value: string) => void;
}

const QuestForm = ({ setLoading, setErrorMessage }: QuestFormProps) => {
    const { addQuests } = useContext(QuestContext);

    const [questPrompt, setQuestPrompt] = useState<string>();
    const [isGenerative, setIsGenerative] = useState<boolean>(true);

    const handleQuestSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        if (!questPrompt) return;
        const parentQuest: Quest = {
            prompt: questPrompt,
            text: questPrompt,
            completed: false,
            id: randomId(),
        };
        if (!isGenerative) return addQuests(parentQuest);
        setLoading(true);
        const { generatedQuests, error } = await generateQuests(
            questPrompt,
            parentQuest.id
        );
        if (error || !generatedQuests) {
            setLoading(false);
            setErrorMessage("Prompt Not Understood");
            return;
        }
        setLoading(false);
        addQuests([parentQuest, ...generatedQuests]);
    };

    return (
        <form onSubmit={handleQuestSubmit} style={{ width: "100%" }}>
            <Box width="100%" display="flex" alignItems="center" gap={1}>
                <TextField
                    onChange={(e) => setQuestPrompt(e.target.value)}
                    placeholder="What do you need to do?"
                    size="small"
                    sx={{
                        flexGrow: 3,
                    }}
                />
                <Tooltip title="Toggle Generative AI">
                    <ToggleButton
                        value="isGenerative"
                        selected={isGenerative}
                        onChange={() => setIsGenerative((prev) => !prev)}
                        size="small"
                    >
                        <AutoAwesome />
                    </ToggleButton>
                </Tooltip>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    Submit
                </Button>
            </Box>
        </form>
    );
};
export default QuestForm;

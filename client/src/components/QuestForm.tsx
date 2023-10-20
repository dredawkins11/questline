import { AutoAwesome } from "@mui/icons-material";
import { Box, Button, TextField, ToggleButton, Tooltip } from "@mui/material";
import { useState, FormEventHandler, useContext } from "react";
import { QuestContext } from "../store/QuestContextProvider";
import { generateQuests, randomId } from "../utils/generateQuests";
import { Quest } from "../types";
import { AppContext } from "../store/AppContextProvider";
import PromptError from "../utils/PromptError";

interface QuestFormProps {
    setLoading: (value: boolean) => void;
}

const QuestForm = ({ setLoading }: QuestFormProps) => {
    const { addQuests } = useContext(QuestContext);
    const { setError } = useContext(AppContext);

    const [questPrompt, setQuestPrompt] = useState<string>();
    const [inputError, setInputError] = useState(false);
    const [isGenerative, setIsGenerative] = useState<boolean>(true);

    const handleQuestSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        if (!questPrompt) return setInputError(true);
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
            setError(new PromptError());
            return;
        }
        setLoading(false);
        addQuests([parentQuest, ...generatedQuests]);
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        setQuestPrompt(value);
        if (value.trim() == "") return setInputError(true);
        setInputError(false);
    };

    return (
        <form onSubmit={handleQuestSubmit} style={{ width: "100%" }}>
            <Box width="100%" display="flex" alignItems="center" gap={1}>
                <TextField
                    onChange={onInputChange}
                    onBlur={() => setInputError(false)}
                    error={inputError}
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

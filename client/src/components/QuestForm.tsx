import { AutoAwesome } from "@mui/icons-material";
import { Box, Button, TextField, ToggleButton, Tooltip } from "@mui/material";
import { useState, FormEventHandler, useContext } from "react";
import { QuestContext } from "../store/QuestContextProvider";
import {generateQuests, randomId} from "../utils/generateQuests";
import { Quest } from "../types";
import { randomUUID } from "crypto";

interface QuestFormProps {}

const QuestForm = ({}: QuestFormProps) => {
    const { addQuests } = useContext(QuestContext);

    const [questPrompt, setQuestPrompt] = useState<string>();
    const [isGenerative, setIsGenerative] = useState<boolean>(true);

    const handleQuestSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        if (!questPrompt) return
        const parentQuest: Quest = {
            prompt: questPrompt,
            text: questPrompt,
            completed: false,
            id: randomId()
        } 
        if (!isGenerative) return addQuests(parentQuest)
        const subQuests = await generateQuests(questPrompt, parentQuest.id)
        addQuests([parentQuest, ...subQuests])
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

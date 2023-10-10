import { AutoAwesome } from "@mui/icons-material";
import { Box, Button, TextField, ToggleButton, Tooltip } from "@mui/material";
import { useState, FormEventHandler, useContext } from "react";
import { QuestContext } from "../store/QuestContextProvider";

interface QuestFormProps {
}

const QuestForm = ({ }: QuestFormProps) => {
    const {addQuest} = useContext(QuestContext)

    const [questPrompt, setQuestPrompt] = useState<string>();
    const [isManual, setIsManual] = useState<boolean>(true);

    const handleQuestSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (questPrompt) {
            addQuest(questPrompt);
        }
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
                        value="isManual"
                        selected={!isManual}
                        onChange={() => setIsManual((prev) => !prev)}
                        size="small"
                    >
                        <AutoAwesome />
                    </ToggleButton>
                </Tooltip>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        flexGrow: 1
                    }}
                >
                    Submit
                    {/* <Typography>Generative AI {isManual ? "OFF" : "ON"}</Typography> */}
                </Button>
            </Box>
        </form>
    );
};
export default QuestForm;

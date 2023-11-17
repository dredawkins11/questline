import {
    ChevronLeft,
    ChevronRight,
    Close,
} from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState, FormEventHandler, useContext } from "react";
import { generateQuest, randomId } from "../utils/generateQuests";
import { Quest } from "../types";
import PromptError from "../utils/PromptError";
import Line from "./ui/Line";

const MAX_TASKS = 15;
const MIN_TASKS = 3;

interface QuestFormProps {
    setLoading: (value: boolean) => void;
    onClose: () => void;
    onAddQuest: (quest: Quest) => void;
}

const QuestForm = ({ setLoading, onClose, onAddQuest }: QuestFormProps) => {

    const [isGenerative, setIsGenerative] = useState<boolean>(true);
    const [questPrompt, setQuestPrompt] = useState<string>();
    const [taskAmount, setTaskAmount] = useState(5);
    const [inputError, setInputError] = useState(false);

    const handleQuestSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        if (!questPrompt) return setInputError(true);
        if (!isGenerative) {
            return onAddQuest({
                prompt: `I need to ${questPrompt}`,
                title: questPrompt,
                description: "Quest Description....",
                tasks: [{text: "First I need to...", completed: false}],
                id: randomId(),
            });
        }
        setLoading(true);
        const { quest, error } = await generateQuest(questPrompt, taskAmount);
        if (error || !quest) {
            setLoading(false);
            // setError(new PromptError());
            return;
        }
        setLoading(false);
        onAddQuest(quest);
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        setQuestPrompt(value);
        if (value.trim() == "") return setInputError(true);
        setInputError(false);
    };

    const changeTaskAmount = (direction: "UP" | "DOWN") => {
        setTaskAmount((prev) => {
            let newAmount = prev;

            if (direction === "UP") {
                newAmount++;
                if (newAmount > MAX_TASKS) newAmount = MAX_TASKS;
            } else {
                newAmount--;
                if (newAmount < MIN_TASKS) newAmount = MIN_TASKS;
            }

            return newAmount;
        });
    };

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={3}
            paddingX={3}
            paddingBottom={1}
            height={1}
        >
            <Stack direction="row" alignItems="center" gap={1}>
                <Stack
                    direction="row"
                    alignItems="center"
                    flexGrow={1}
                    gap={1}
                    zIndex={2}
                >
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                    {!smallScreen && <Line direction="horizontal" flow="row" />}
                </Stack>
                <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{
                        ...(smallScreen && {
                            position: "absolute",
                            left: 0,
                            width: 1,
                        }),
                    }}
                >
                    New Quest
                </Typography>
                {!smallScreen && <Line direction="horizontal" flow="row" />}
            </Stack>
            <Stack alignItems="center" gap={2}>
                <Typography variant="h4">Generative?</Typography>
                <Stack direction="row" gap={3}>
                    <Button
                        variant={isGenerative ? "outlined" : "text"}
                        onClick={() => setIsGenerative(true)}
                        sx={{ opacity: isGenerative ? 1 : 0.5 }}
                    >
                        YES
                    </Button>
                    <Button
                        variant={!isGenerative ? "outlined" : "text"}
                        onClick={() => setIsGenerative(false)}
                        sx={{ opacity: !isGenerative ? 1 : 0.5 }}
                    >
                        NO
                    </Button>
                </Stack>
            </Stack>
            <Stack alignItems="center" gap={2}>
                {isGenerative ? (
                    <>
                        <Typography variant="h4">Quest Prompt</Typography>
                        <TextField
                            multiline
                            minRows={3}
                            maxRows={3}
                            size="small"
                            onChange={onInputChange}
                            error={inputError}
                            onBlur={() => setInputError(false)}
                            sx={{ width: 0.7 }}
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="h4">Quest Title</Typography>
                        <TextField
                            size="small"
                            inputProps={{ maxLength: 40 }}
                            onChange={onInputChange}
                            error={inputError}
                            onBlur={() => setInputError(false)}
                            sx={{ width: 0.7 }}
                        />
                    </>
                )}
            </Stack>
            <Stack alignItems="center" gap={2}>
                <Typography variant="h4">Task Amount</Typography>
                <Stack
                    direction="row"
                    alignItems="flex-end"
                    justifyContent="space-around"
                    gap={2}
                    width={0.8}
                >
                    <IconButton
                        size="large"
                        onClick={() => changeTaskAmount("DOWN")}
                    >
                        <ChevronLeft fontSize="large" />
                    </IconButton>
                    <Typography variant="h3" lineHeight={1}>
                        {taskAmount}
                    </Typography>
                    <IconButton
                        size="large"
                        onClick={() => changeTaskAmount("UP")}
                    >
                        <ChevronRight fontSize="large" />
                    </IconButton>
                </Stack>
            </Stack>
            <Button onClick={handleQuestSubmit} sx={{ marginY: 2 }}>
                Start Quest!
            </Button>
        </Box>
        // <form onSubmit={handleQuestSubmit} style={{ width: "100%" }}>
        //     <Box width="100%" display="flex" alignItems="center" gap={1}>
        //         <TextField
        //             onChange={onInputChange}
        //             onBlur={() => setInputError(false)}
        //             error={inputError}
        //             placeholder="What do you need to do?"
        //             size="small"
        //             sx={{
        //                 flexGrow: 3,
        //             }}
        //         />
        //         <Tooltip title="Toggle Generative AI">
        //             <ToggleButton
        //                 value="isGenerative"
        //                 selected={isGenerative}
        //                 onChange={() => setIsGenerative((prev) => !prev)}
        //                 size="small"
        //             >
        //                 <AutoAwesome />
        //             </ToggleButton>
        //         </Tooltip>
        //         <Button
        //             type="submit"
        //             variant="contained"
        //             sx={{
        //                 flexGrow: 1,
        //             }}
        //         >
        //             Submit
        //         </Button>
        //     </Box>
        // </form>
    );
};
export default QuestForm;

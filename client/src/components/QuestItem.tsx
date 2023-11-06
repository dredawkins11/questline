import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { Quest } from "../types";
import { ExpandMore } from "@mui/icons-material";
// import { useContext, useState } from "react";
// import QuestContext from "../store/QuestContext";
// import { generateQuests, randomId } from "../utils/generateQuests";
// import { AppContext } from "../store/AppContextProvider";
// import PromptError from "../utils/PromptError";
// import QuestSkeleton from "./QuestSkeleton";
import QuestTask from "./QuestTask";
import Line from "./ui/Line";

interface QuestItemProps {
    questTitle: string;
    questId: string,
    onSelect: (id: string) => void
}

const QuestItem = ({ questTitle, questId, onSelect }: QuestItemProps) => {
    // const { quests, addQuests, editQuest, deleteQuest } =
    //     useContext(QuestContext);
    // const { setError } = useContext(AppContext);

    // const [addingSubQuest, setAddingSubQuest] = useState<boolean>(false);
    // const [questText, setQuestText] = useState(quest.text);
    // const [originalText, setOriginalText] = useState(quest.text);
    // const [editTimeout, setEditTimeout] = useState<
    //     NodeJS.Timeout | undefined
    // >();
    // const [editing, setEditing] = useState(false);
    // const [inputError, setInputError] = useState(false);
    // const [loading, setLoading] = useState(false);

    // const toggleEdit = () => {
    //     if (!editing) {
    //         startEditTimer(5000);
    //         setOriginalText(questText);
    //         setEditing(true);
    //         return;
    //     }
    //     if (questText.trim() == "") {
    //         setQuestText(originalText);
    //         setInputError(true);
    //         return;
    //     }
    //     clearTimeout(editTimeout);
    //     const editedQuest = { ...quest, text: questText };
    //     editQuest(editedQuest, quest.id);
    //     setEditing(false);
    // };

    // const toggleAdding = () => {
    //     if (editing) toggleEdit();
    //     setAddingSubQuest(!addingSubQuest);
    // };

    // const addSubQuest = async (generate?: boolean) => {
    //     if (generate) {
    //         setLoading(true);
    //         const { generatedQuests, error } = await generateQuests(
    //             quest.text,
    //             quest.id
    //         );
    //         if (error || !generatedQuests) {
    //             setLoading(false);
    //             setError(new PromptError());
    //             return;
    //         }
    //         setLoading(false);
    //         addQuests(generatedQuests);
    //         return;
    //     }
    //     const newQuest: Quest = {
    //         prompt: quest.prompt,
    //         text: "New quest",
    //         completed: false,
    //         parent: quest.id,
    //         id: randomId(),
    //     };
    //     addQuests(newQuest);
    // };

    // const completeQuest = () => {
    //     editQuest({ ...quest, completed: !quest.completed }, quest.id);
    // };

    // const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    //     const value = e.target.value;
    //     setQuestText(value);
    //     if (value.trim() == "") return setInputError(true);
    //     setInputError(false);
    // };

    // const startEditTimer = (time: number) => {
    //     const timeout = setTimeout(() => {
    //         setQuestText(originalText);
    //         setInputError(false);
    //         setEditing(false);
    //     }, time);
    //     setEditTimeout(timeout);
    // };


    return (
        <>
            <Box
                onClick={() => onSelect(questId)}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={
                    {
                        // backgroundColor: () => {
                        //     if (parentCompleted) return "rgba(0,0,0,0)";
                        //     if (addingSubQuest) return "action.hover";
                        //     return "background.paper";
                        // },
                        // position: "relative",
                        // height: "3rem",
                        // "&::before": {
                        //     position: "absolute",
                        //     left: 0,
                        //     right: 0,
                        //     top: "-1px",
                        //     height: "1px",
                        //     content: '""',
                        //     opacity: 1,
                        //     userSelect: "text",
                        //     backgroundColor: "rgba(255, 255, 255, 0.12)",
                        //     transition:
                        //         "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        // },
                    }
                }
            >
                <Typography variant="h5">{questTitle}</Typography>
                {/* <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h5">{quest.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack gap={3}>
                            <Typography>{quest.description}</Typography>
                            <Stack direction="row" alignItems="center" gap={3}>
                                <Line direction="horizontal" flow="row" sx={(theme)=>({backgroundColor: theme.palette.text.primary})}/>
                                <Typography variant="h5">Tasks</Typography>
                                <Line direction="horizontal" flow="row" sx={(theme)=>({backgroundColor: theme.palette.text.primary})}/>
                            </Stack>
                            <Stack>
                                {quest.tasks.map((task, i) => (
                                    <QuestTask
                                        key={i}
                                        task={task}
                                        last={i == quest.tasks.length - 1}
                                    />
                                ))}
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                sx={(theme) => ({
                                    height: theme.spacing(8)
                                })}
                            >
                                <Button>Regenerate Tasks</Button>
                                <Line direction="vertical" flow="row" />
                                <Button>Add New Task</Button>
                            </Stack>
                        </Stack>
                    </AccordionDetails>
                </Accordion> */}
            </Box>
        </>
    );
};
export default QuestItem;

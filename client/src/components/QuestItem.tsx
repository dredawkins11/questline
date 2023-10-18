import {
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
import {
    Add as AddIcon,
    AutoAwesome as AutoAwesomeIcon,
    Close as CloseIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    EditNote as EditNoteIcon,
    Check as CheckIcon,
} from "@mui/icons-material";
import IconMenu from "./ui/IconMenu";
import { useContext, useEffect, useState } from "react";
import { QuestContext } from "../store/QuestContextProvider";
import { generateQuests, randomId } from "../utils/generateQuests";
import QuestSkeleton from "./QuestSkeleton";

interface QuestItemProps {
    quest: Quest;
    setErrorMessage: (value: string) => void;
}

const QuestItem = ({ quest, setErrorMessage }: QuestItemProps) => {
    const { quests, addQuests, editQuest, deleteQuest } =
        useContext(QuestContext);

    const [parentCompleted, setParentCompleted] = useState<boolean | undefined>(
        quest.completed
    );
    const [addingSubQuest, setAddingSubQuest] = useState<boolean>(false);
    const [questText, setQuestText] = useState(quest.text);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setParentCompleted(
            (_) => quests.find((x) => x.id == quest.parent)?.completed
        );
    }, [quest]);

    const toggleEdit = () => {
        if (!editing) return setEditing(true);
        const editedQuest = { ...quest, text: questText };
        editQuest(editedQuest, quest.id);
        setEditing(false);
    };

    const toggleAdding = () => {
        if (editing) toggleEdit();
        setAddingSubQuest(!addingSubQuest);
    };

    const addSubQuest = async (generate?: boolean) => {
        if (generate) {
            setLoading(true);
            const {generatedQuests, error} = await generateQuests(quest.text, quest.id);
            if (error || !generatedQuests) {
                setLoading(false);
                setErrorMessage("Prompt Not Understood");
                return;
            }
            setLoading(false);
            addQuests(generatedQuests);
            return;
        }
        const newQuest: Quest = {
            prompt: quest.prompt,
            text: "New quest",
            completed: false,
            parent: quest.id,
            id: randomId(),
        };
        addQuests(newQuest);
    };

    const completeQuest = () => {
        editQuest({ ...quest, completed: !quest.completed }, quest.id);
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    backgroundColor: () => {
                        if (parentCompleted) return "rgba(0,0,0,0)";
                        if (quest.completed || parentCompleted)
                            return "action.disabledBackground";
                        if (addingSubQuest) return "action.hover";
                        return "background.paper";
                    },
                    position: "relative",
                    height: "3rem",
                    "&::before": {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "-1px",
                        height: "1px",
                        content: '""',
                        opacity: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        transition:
                            "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    },
                }}
            >
                <Checkbox
                    disabled={parentCompleted}
                    checked={
                        parentCompleted ? parentCompleted : quest.completed
                    }
                    onClick={completeQuest}
                    sx={{
                        visibility: addingSubQuest ? "hidden" : "visible",
                    }}
                />
                {!editing ? (
                    <Typography
                        flexGrow={1}
                        fontWeight={addingSubQuest ? "bold" : "normal"}
                        sx={{
                            position: "relative",
                            left: addingSubQuest ? "-5%" : 0,
                            textDecoration: parentCompleted
                                ? "line-through"
                                : "none",
                        }}
                    >
                        {addingSubQuest ? "Add new sub-quest?" : quest.text}
                    </Typography>
                ) : (
                    <TextField
                        value={questText}
                        onChange={(e) => setQuestText(e.target.value)}
                        size="small"
                        variant="standard"
                        hiddenLabel
                        sx={{
                            flexGrow: 1,
                            marginRight: 1,
                        }}
                    />
                )}
                {addingSubQuest && (
                    <Stack flexDirection="row" gap={2} mr={2}>
                        <Button
                            variant="contained"
                            startIcon={<AutoAwesomeIcon />}
                            onClick={() => addSubQuest(true)}
                        >
                            <Typography variant="caption">Generate</Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<EditNoteIcon />}
                            onClick={() => addSubQuest()}
                        >
                            <Typography variant="caption">Manual</Typography>
                        </Button>
                    </Stack>
                )}
                <IconMenu>
                    {editing ? (
                        <>
                            <IconButton onClick={() => deleteQuest(quest.id)}>
                                <Tooltip title="Delete Quest">
                                    <DeleteIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton onClick={toggleEdit}>
                                <Tooltip title="Confirm Edit">
                                    <CheckIcon />
                                </Tooltip>
                            </IconButton>
                        </>
                    ) : addingSubQuest ? (
                        <></>
                    ) : (
                        <IconButton onClick={toggleEdit}>
                            <Tooltip title="Edit Quest">
                                <EditIcon />
                            </Tooltip>
                        </IconButton>
                    )}
                    {addingSubQuest ? (
                        <IconButton onClick={toggleAdding}>
                            <Tooltip title="Cancel">
                                <CloseIcon />
                            </Tooltip>
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={toggleAdding}
                            disabled={parentCompleted}
                        >
                            <AddIcon />
                        </IconButton>
                    )}
                </IconMenu>
            </Box>
            {loading && <QuestSkeleton />}
        </>
    );
};
export default QuestItem;

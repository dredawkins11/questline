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
import {
    ExpandMore as ExpandMoreIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Check as CheckIcon,
    Delete as DeleteIcon,
    AutoAwesome as AutoAwesomeIcon,
    EditNote as EditNoteIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { QuestContext } from "../store/QuestContextProvider";
import IconMenu from "./ui/IconMenu";
import { generateQuests, randomId } from "../utils/generateQuests";

interface QuestProps {
    quest: Quest;
    children: Quest[];
}

const Quest = ({ quest, children }: QuestProps) => {
    const { getChildren, editQuest, deleteQuest, addQuests } =
        useContext(QuestContext);

    const [questExpanded, setQuestExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [questText, setQuestText] = useState(quest.text);
    const [addingSubQuest, setAddingSubQuest] = useState<boolean>(false);

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
            const generatedQuests = await generateQuests(quest.text, quest.id)
            addQuests(generatedQuests);
            return
        }
        const newQuest: Quest = {
            prompt: quest.prompt,
            text: "New quest",
            completed: false,
            id: randomId()
        } 
        addQuests(newQuest)
    };

    const completeQuest = () => {
        editQuest({ ...quest, completed: !quest.completed }, quest.id);
    };

    return (
        <>
            {children.length > 0 ? (
                <Accordion
                    disableGutters
                    sx={{
                        background: "none",
                        boxShadow: "none",
                    }}
                    expanded={questExpanded}
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                onClick={() =>
                                    setQuestExpanded((prev) => !prev)
                                }
                            />
                        }
                        sx={{
                            padding: 0,
                            height: "3rem",
                            "& .MuiAccordionSummary-expandIconWrapper": {
                                padding: "5px",
                            },
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Checkbox
                                checked={quest.completed}
                                onClick={completeQuest}
                            />
                            {!editing ? (
                                <Typography flexGrow={1}>
                                    {quest.text}
                                </Typography>
                            ) : (
                                <>
                                    <TextField
                                        value={questText}
                                        onChange={(e) =>
                                            setQuestText(e.target.value)
                                        }
                                        size="small"
                                        variant="standard"
                                        hiddenLabel
                                        sx={{
                                            flexGrow: 1,
                                            marginRight: 1,
                                        }}
                                    />
                                </>
                            )}
                            <IconMenu>
                                {editing ? (
                                    <>
                                        <IconButton
                                            onClick={() =>
                                                deleteQuest(quest.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={toggleEdit}>
                                            <CheckIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton onClick={toggleEdit}>
                                        <EditIcon />
                                    </IconButton>
                                )}
                            </IconMenu>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {children.map((quest) => (
                            <Quest
                                key={quest.id}
                                quest={quest}
                                children={getChildren(quest.id)}
                            />
                        ))}
                    </AccordionDetails>
                </Accordion>
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        backgroundColor: addingSubQuest
                            ? "action.hover"
                            : "background.paper",
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
                        checked={quest.completed}
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
                                <Typography variant="caption">
                                    Generate
                                </Typography>
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<EditNoteIcon />}
                                onClick={() => addSubQuest()}
                            >
                                <Typography variant="caption">
                                    Manual
                                </Typography>
                            </Button>
                        </Stack>
                    )}
                    <IconMenu>
                        {editing ? (
                            <>
                                <IconButton
                                    onClick={() => deleteQuest(quest.id)}
                                >
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
                            <IconButton onClick={toggleAdding}>
                                <AddIcon />
                            </IconButton>
                        )}
                    </IconMenu>
                </Box>
            )}
        </>
    );
};
export default Quest;

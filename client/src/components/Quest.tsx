import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { Quest } from "../types";
import {
    ExpandMore as ExpandMoreIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Check as CheckIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { QuestContext } from "../store/QuestContextProvider";

interface QuestProps {
    quest: Quest;
    children: Quest[];
}

const Quest = ({ quest, children }: QuestProps) => {
    const { getChildren, editQuest, deleteQuest } = useContext(QuestContext);

    const [questExpanded, setQuestExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [questText, setQuestText] = useState(quest.text);

    const toggleEdit = () => {
        if (!editing) return setEditing(true);
        const editedQuest = { ...quest, text: questText };
        editQuest(editedQuest, quest.id);
        setEditing(false);
    };

    const completeQuest = () => {
        editQuest({...quest, completed: !quest.completed}, quest.id)
    }

    const handleDeleteQuest = () => {
        deleteQuest(quest.id);
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
                            <Checkbox checked={quest.completed} onClick={completeQuest} />
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
                                    <IconButton
                                        size="small"
                                        onClick={handleDeleteQuest}
                                    >
                                        <DeleteIcon
                                            sx={{ fontSize: "1.25rem" }}
                                        />
                                    </IconButton>
                                </>
                            )}
                            <IconButton size="small" onClick={toggleEdit}>
                                {!editing ? (
                                    <EditIcon sx={{ fontSize: "1.25rem" }} />
                                ) : (
                                    <CheckIcon sx={{ fontSize: "1.25rem" }} />
                                )}
                            </IconButton>
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
                    <Checkbox checked={quest.completed} onClick={completeQuest} />
                    {!editing ? (
                        <Typography flexGrow={1}>{quest.text}</Typography>
                    ) : (
                        <>
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
                            <IconButton
                                size="small"
                                onClick={handleDeleteQuest}
                            >
                                <DeleteIcon sx={{ fontSize: "1.25rem" }} />
                            </IconButton>
                        </>
                    )}
                    <IconButton size="small" onClick={toggleEdit}>
                        {!editing ? (
                            <EditIcon sx={{ fontSize: "1.25rem" }} />
                        ) : (
                            <CheckIcon sx={{ fontSize: "1.25rem" }} />
                        )}
                    </IconButton>
                    <IconButton size="small">
                        <AddIcon />
                    </IconButton>
                </Box>
            )}
        </>
    );
};
export default Quest;

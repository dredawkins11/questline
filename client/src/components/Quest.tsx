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
import { useState } from "react";

interface QuestProps {
    quest: Quest;
    onEditQuest: (questText: string, id: string) => void;
    onDeleteQuest: (id: string) => void;
}

const Quest = ({ quest, onEditQuest, onDeleteQuest }: QuestProps) => {
    const [questExpanded, setQuestExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [questText, setQuestText] = useState(quest.text);

    const toggleEdit = () => {
        if (!editing) return setEditing(true);
        onEditQuest(questText, quest.id);
        setEditing(false);
    };

    const handleDeleteQuest = () => {
        onDeleteQuest(quest.id)
    }

    return (
        <>
            {quest.subQuests.length > 0 ? (
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
                            <Checkbox checked={quest.completed} />
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
                                    <IconButton size="small" onClick={handleDeleteQuest}>
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
                        {quest.subQuests.map((quest, i) => (
                            <Quest
                                key={i}
                                quest={quest}
                                onEditQuest={onEditQuest}
                                onDeleteQuest={onDeleteQuest}
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
                    <Checkbox checked={quest.completed} />
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
                            <IconButton size="small" onClick={handleDeleteQuest}>
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

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
import QuestItem from "./QuestItem";

interface QuestProps {
    quest: Quest;
    children: Quest[];
}

const ParentQuestItem = ({ quest, children }: QuestProps) => {
    const { getChildren, editQuest, deleteQuest } =
        useContext(QuestContext);

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
        editQuest({ ...quest, completed: !quest.completed }, quest.id);
    };

    return (
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
                        onClick={() => setQuestExpanded((prev) => !prev)}
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
                        </>
                    )}
                    <IconMenu>
                        {editing ? (
                            <>
                                <IconButton
                                    onClick={() => deleteQuest(quest.id)}
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
                {children.map((quest) => {

                    if (children.length == 0) return <QuestItem key={quest.id} quest={quest} />

                    const questChildren = getChildren(quest.id);
                    return (
                        <ParentQuestItem
                            key={quest.id}
                            quest={quest}
                            children={questChildren}
                        />
                    )
                })}
            </AccordionDetails>
        </Accordion>
    );
};
export default ParentQuestItem;

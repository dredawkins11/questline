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
    Edit as EditIcon,
    Check as CheckIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { QuestContext } from "../store/QuestContextProvider";
import IconMenu from "./ui/IconMenu";
import QuestItem from "./QuestItem";

interface QuestProps {
    quest: Quest;
    children: Quest[];
}

const ParentQuestItem = ({ quest, children }: QuestProps) => {
    const { quests, getChildren, editQuest, deleteQuest } =
        useContext(QuestContext);

    const [parentCompleted, setParentCompleted] = useState<boolean | undefined>(
        quest.completed
    );
    const [questExpanded, setQuestExpanded] = useState(true);
    const [editing, setEditing] = useState(false);
    const [questText, setQuestText] = useState(quest.text);

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

    const completeQuest = () => {
        if (!quest.completed) setQuestExpanded(false)
        editQuest({ ...quest, completed: !quest.completed }, quest.id);
    };

    return (
        <Accordion
            disableGutters
            sx={{
                background: parentCompleted || quest.completed ? "unset" : "none",
                backgroundColor: parentCompleted || quest.completed ? "action.disabledBackground" : "",
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
                    <Checkbox disabled={parentCompleted} checked={parentCompleted ? parentCompleted : quest.completed} onClick={completeQuest} />
                    {!editing ? (
                        <Typography
                            flexGrow={1}
                            sx={{
                                textDecoration: parentCompleted || quest.completed
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {quest.text}
                        </Typography>
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
                    const questChildren = getChildren(quest.id);
                    if (questChildren.length == 0)
                        return <QuestItem key={quest.id} quest={quest} />;

                    return (
                        <ParentQuestItem
                            key={quest.id}
                            quest={quest}
                            children={questChildren}
                        />
                    );
                })}
            </AccordionDetails>
        </Accordion>
    );
};
export default ParentQuestItem;

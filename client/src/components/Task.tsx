import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from "@mui/material"
import { Task } from "../types"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"

interface TaskProps {
    task: Task
}
const Task = ({task}: TaskProps) =>{
    return (
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Checkbox checked={task.completed}/>
                {task.text}
            </AccordionSummary>
            <AccordionDetails>
            
            </AccordionDetails>
        </Accordion>
    )
}
export default Task
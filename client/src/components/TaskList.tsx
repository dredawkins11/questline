import { Stack } from "@mui/material"
import Task from "./Task"

interface TaskListProps {
    tasks: Task[]
}

const TaskList = ({tasks}: TaskListProps) =>{
    return (
        <Stack width="100%">
            {tasks.map( (task, i) => <Task key={i} task={task} />)}
        </Stack>
    )
}
export default TaskList
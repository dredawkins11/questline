import { Close, Edit } from "@mui/icons-material";
import { Box, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import IconMenu from "./ui/IconMenu";
import Line from "./ui/Line";

interface QuestTaskProps {
    task: string;
    last: boolean;
}

const QuestTask = ({ task, last }: QuestTaskProps) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
        >
            <Stack direction="column" alignItems="center" alignSelf="stretch">
                <Checkbox sx={{padding: 0}} />
                {!last && <Line direction="vertical" flow="column" />}
            </Stack>
            <Typography variant="body2" flexGrow={1} mb={2}>
                {task}
            </Typography>
            {/* <IconMenu>
                <IconButton>
                    <Edit />
                </IconButton>
                <IconButton>
                    <Close />
                </IconButton>
            </IconMenu> */}
        </Stack>
    );
};
export default QuestTask;

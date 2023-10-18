import { Box, Skeleton } from "@mui/material";

interface QuestSkeletonProps {}

const QuestSkeleton = ({}: QuestSkeletonProps) => {
    return (
        <Box display="flex" alignItems="center" gap={2} >
            <Skeleton variant="text" sx={{flexGrow: 1, height: "4rem"}}/>
            <Skeleton variant="text" sx={{ flexGrow: 10, height: "4rem" }} />
            <Skeleton variant="text" sx={{ flexGrow: 2, height: "4rem" }} />
        </Box>
    );
};
export default QuestSkeleton;

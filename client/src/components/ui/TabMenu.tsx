import { Box, Tab, Tabs, styled } from "@mui/material";

const StyledTabs = styled(Tabs)(({ theme }) => ({
    "& .MuiTabs-indicator": {
        display: "none",
    },
    "& .MuiTabs-flexContainer": {
        gap: theme.spacing(3)
    },
    [theme.breakpoints.down("sm")]: {
        "& .MuiTabs-flexContainer": {
            gap: theme.spacing(1)
        }
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    flexGrow: 1,
    border: `solid 1px ${theme.palette.text.secondary}`,
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    opacity: .7,
    "&.Mui-selected": {
        backgroundColor: theme.palette.background.paper,
        opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: ".7rem",
    }
}));

interface TabMenuProps {
    onChangeTab: (value: number) => void;
    tab: number;
}

const TabMenu = ({ tab, onChangeTab }: TabMenuProps) => {
    return (
        <Box sx={{transform: "translateY(15%)"}}>
            <StyledTabs
                variant="fullWidth"
                value={tab}
                onChange={(_, value) => onChangeTab(value)}
            >
                <StyledTab disableRipple label="All Quests" />
                <StyledTab disableRipple label="Incomplete" />
                <StyledTab disableRipple label="Completed" />
            </StyledTabs>
        </Box>
    );
};
export default TabMenu;

import { SxProps, Theme, styled } from "@mui/material";

const LineBody = styled("div")<LineProps>(({ direction, flow, theme }) => ({
    margin: `${theme.spacing(1)} 0`,
    ...(direction === "vertical" && {
        width: "2px",
        ...(flow === "column" && {
            flex: `1 ${theme.spacing(2)}`,
        }),
    }),
    ...(direction === "horizontal" && {
        height: "2px",
        ...(flow === "row" && {
            flex: `1 ${theme.spacing(2)}`,
        }),
    }),
    backgroundColor: theme.palette.text.secondary,
}));

interface LineProps {
    direction: "horizontal" | "vertical";
    flow: "row" | "column";
    sx?: SxProps<Theme>;
}

const Line = ({ direction, flow, sx }: LineProps) => {
    return <LineBody direction={direction} flow={flow} sx={sx} />;
};
export default Line;

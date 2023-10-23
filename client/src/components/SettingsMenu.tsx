import {
    Box,
    Button,
    Container,
    OutlinedInput,
    Modal,
    Paper,
    Switch,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../store/AppContextProvider";
import { QuestContext } from "../store/QuestContextProvider";

interface SettingsMenuProps {
    onCloseSettings: () => void;
}

const MAX_STEPS = 15;
const MIN_STEPS = 1;

const SettingsMenu = ({ onCloseSettings }: SettingsMenuProps) => {
    const { darkMode, setDarkMode, stepAmount, setStepAmount } =
        useContext(AppContext);
    const { clearQuests } = useContext(QuestContext);

    const [numberInput, setNumberInput] = useState<string>(
        stepAmount.toString()
    );
    const [editTimeout, setEditTimeout] = useState<null | NodeJS.Timeout>(null);
    const [confirming, setConfirming] = useState(false);

    const onStepsInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        if (e.target.value == "") setNumberInput("");
        let value = parseInt(e.target.value);
        if (Number.isNaN(value)) return;
        if (value > MAX_STEPS) value = MAX_STEPS;
        if (value < 0) value = 0;

        if (editTimeout) clearTimeout(editTimeout);
        setEditTimeout(
            setTimeout(
                () => setStepAmount(value == 0 ? MIN_STEPS : value),
                1000
            )
        );
        setNumberInput(value.toString());
    };

    const onStepsInputBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value != "") return;
        setNumberInput(MIN_STEPS.toString());
    };

    const handleCloseSettings = () => {
        setStepAmount(parseInt(numberInput));
        onCloseSettings();
    };

    return (
        <Modal open={true}>
            <Container
                maxWidth="sm"
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 10,
                        width: 0.7,
                        padding: 3,
                        gap: 2,
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6" fontWeight="bold">
                            Number of steps
                        </Typography>
                        <OutlinedInput
                            type="number"
                            inputProps={{ min: 0, max: 10 }}
                            size="small"
                            value={numberInput}
                            onChange={onStepsInputChange}
                            onBlur={onStepsInputBlur}
                            sx={{
                                width: 0.2,
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                                    {
                                        display: "none",
                                    },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                        />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6" fontWeight="bold">
                            Dark mode
                        </Typography>
                        <Switch
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                        />
                    </Box>

                    {confirming ? (
                        <Box display="flex" justifyContent="space-between" gap={2}>
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{flex: 1}}
                                onClick={() => {
                                    clearQuests();
                                    setConfirming(false);
                                }}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{flex: 1}}
                                onClick={() => setConfirming(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setConfirming(true)}
                        >
                            Delete ALL Quests
                        </Button>
                    )}
                    <Button variant="contained" onClick={handleCloseSettings}>
                        Close
                    </Button>
                </Paper>
            </Container>
        </Modal>
    );
};
export default SettingsMenu;

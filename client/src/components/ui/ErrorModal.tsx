import { Button, Container, Modal, Paper, Typography } from "@mui/material"
import { useContext } from "react";
import { AppContext } from "../../store/AppContextProvider";

interface ErrorModalProps {
}

const ErrorModal = ({}: ErrorModalProps) =>{

    const {error, setError} = useContext(AppContext)


    return (
        <Modal open={error != null}>
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
                        <Typography variant="h5" textAlign="center" fontWeight="bold">
                            {error?.name}
                        </Typography>
                        <Typography variant="body2" textAlign="center" mb={3}>
                            {error?.message}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setError(null)}
                        >
                            Okay
                        </Button>
                    </Paper>
                </Container>
            </Modal>
    )
}
export default ErrorModal
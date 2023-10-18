import { Button, Container, Modal, Paper, Typography } from "@mui/material"

interface ErrorModalProps {
    errorMessage: string;
    setErrorMessage: (value: string | null) => void
}

const ErrorModal = ({errorMessage, setErrorMessage}: ErrorModalProps) =>{
    const getDescription = () => {
        switch (errorMessage) {
            case "Prompt Not Understood":
                return "This prompt couldn't be understood. Please try to be more specific in order to achieve better results."
        }
    }

    return (
        <Modal open={errorMessage != null}>
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
                            {errorMessage}
                        </Typography>
                        <Typography variant="body2" textAlign="center" mb={3}>
                            {getDescription()}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setErrorMessage(null)}
                        >
                            Okay
                        </Button>
                    </Paper>
                </Container>
            </Modal>
    )
}
export default ErrorModal
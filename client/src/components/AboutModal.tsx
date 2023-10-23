import { Button, Container, Modal, Paper, Typography } from "@mui/material"

interface AboutModalProps {
    open: boolean,
    onCloseAbout: () => void
}

const AboutModal = ({open, onCloseAbout}: AboutModalProps) =>{
    return (
        <Modal open={open}>
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
                            About
                        </Typography>
                        <Typography variant="body2" textAlign="center" mb={3}>
                            This is my project I made
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={onCloseAbout}
                        >
                            Got It
                        </Button>
                    </Paper>
                </Container>
        </Modal>
    )
}
export default AboutModal
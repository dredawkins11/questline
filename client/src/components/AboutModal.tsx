import { Add, Edit} from "@mui/icons-material"
import { Button, Container, Modal, Paper, Typography } from "@mui/material"

interface AboutModalProps {
    open: boolean,
    onCloseAbout: () => void
}

const AboutModal = ({open, onCloseAbout}: AboutModalProps) =>{
    return (
        <Modal open={open}>
            <Container
                    maxWidth="md"
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
                        <Typography variant="body1" textAlign="center" mb={3}>
                            This is a project app that is meant to assist with making it easier to complete goals and tasks. The app will take a task, and break it down into smaller parts. To use, simply type something that you want to get done, and then the app will generate the auest and its sub-quests.
                        </Typography>
                        <Typography variant="body1" textAlign="center">To edit a quest press the <Edit/> icon.</Typography>
                        <Typography variant="body1" textAlign="center" mb={3}>To add a sub quest press the <Add/> icon.</Typography>
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
import { Add, Edit, GitHub, Menu, Note, Twitter } from "@mui/icons-material"
import { Button, Container, IconButton, Link, Modal, Paper, Stack, Typography } from "@mui/material"

interface AboutModalProps {
    open: boolean,
    onCloseAbout: () => void
}

const AboutModal = ({open, onCloseAbout}: AboutModalProps) =>{
    return (
        <Modal open={open}>
            <Container
                    sx={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            // justifyContent: "space-around",
                            alignItems: "center",
                            width: 0.9,
                            maxHeight: .9,
                            padding: 3,
                            gap: 3,
                        }}
                    >
                        <Typography variant="h5" textAlign="center" fontWeight="bold">
                            About
                        </Typography>
                        <Typography variant="body2" textAlign="justify">
                            Welcome to QuestLine! QuestLine is a personal project I created that utilizes OpenAI's ChatGPT. The app has the simple goal of transorming personal goals into a game-like quest. It's use is simple: Click the 'New Quest' button at the bottom to start a new quest. Enter the thing you want to do, and how many steps, or tasks, you want the quest to be split into. (You can also turn off AI generation, if you want to manually input quest details instead.)
                        </Typography>
                        <Typography variant="body2" textAlign="justify">Quests can be edited and deleted, once they are selected by clicking on them in the list. Additionally you can sort the quests by how completed they are with the tabs on the top.</Typography>
                        <Stack direction="row" justifyContent="center" gap={3} mb={3}>
                            <Link><IconButton><GitHub/></IconButton></Link>
                            <Link><IconButton><Twitter/></IconButton></Link>
                            <Link><IconButton><Note/></IconButton></Link>
                        </Stack>
                        <Button
                            variant="outlined"
                            onClick={onCloseAbout}
                            sx={{maxWidth: .5, minWidth: .3}}
                        >
                            Got It
                        </Button>
                    </Paper>
                </Container>
        </Modal>
    )
}
export default AboutModal
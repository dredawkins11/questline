import "dotenv/config.js";
import express from "express"
import cors from "cors"
import { newQuest } from "./quest.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*"
}))
app.use( (req, res, next) => {
    console.log(req.body);
    next()
})

app.post("/quest", async (req, res) => {
    try {
        const quest = await newQuest(req.body.task, req.body.stepAmount)
        res.send(quest)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad prompt")
    }
})

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}!`);
});


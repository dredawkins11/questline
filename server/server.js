import "dotenv/config.js";
import express from "express"
import { newQuest } from "./quest.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use( (req, res, next) => {
    console.log(req.body);
    next()
})

app.post("/quest", async (req, res) => {
    const quest = await newQuest(req.body.task)
    res.send(quest)
})

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}!`);
});


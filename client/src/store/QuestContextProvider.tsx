import { useEffect, useState } from "react";
import { Quest } from "../types";
import QuestContext from "./QuestContext";

interface QuestContextProviderProps {
    children: React.ReactNode;
}

const DUMMY_QUESTS: Quest[] = [
    {
        prompt: "I need to do something awesome!",
        title: "Slay the Demon King",
        description:
            "To complete this epic quest, I must embark on a perilous journey to vanquish the malevolent Demon King. This daunting task will test my courage, skill, and determination. By defeating the Demon King, I will bring peace to the realm, ensuring the safety of its inhabitants and securing my place in the annals of legends.",
        tasks: [
            "Gather supplies and weapons.",
            "Seek guidance from wise elders.",
            "Travel to the cursed forest.",
            "Survive encounters with monstrous creatures.",
            "Solve riddles to enter the Demon King's lair.",
            "Engage in a fierce battle of wits and strength.",
            "Uncover the Demon King's weaknesses.",
            "Summon the power of ancient relics.",
            "Strategically attack to weaken the Demon King.",
            "Deliver the final blow to end the dark reign.",
        ],
        id: "1",
    },
    {
        prompt: "nunya",
        title: "Maiden's Cleanse",
        description:
            "My home needs a thorough cleansing. It's time to conquer this quest, for a tidy abode is a peaceful sanctuary. The clutter has grown, and I seek to restore order and serenity. By completing this task, I will bask in the satisfaction of a pristine living space. Let the Maiden's Cleanse begin!",
        tasks: [
            "Gather cleaning supplies",
            "Start with the kitchen",
            "Wash the dishes and utensils",
            "Wipe down countertops and appliances",
            "Sweep the kitchen floor",
            "Move to the living room",
            "Dust and polish surfaces",
            "Vacuum the carpets",
            "Arrange and tidy up",
            "Admire the sparkling results",
        ],
        id: "2",
    },
];

const QuestContextProvider = ({ children }: QuestContextProviderProps) => {
    // const [loading, setLoading] = useState<boolean>(false);
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
    const [quests, setQuests] = useState<Quest[]>([]);

    const storedQuests: string | null = localStorage.getItem("quests");
    useEffect(() => {
        if (storedQuests == null || storedQuests == "") return;
        setQuests(JSON.parse(storedQuests));
    }, [storedQuests]);

    const addQuests = async (quests: Quest | Quest[]) => {
        let newQuests: Quest[];
        newQuests = Array.isArray(quests) ? [...quests] : [quests];

        setQuests((prevState) => {
            const quests = [...prevState, ...newQuests];
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const clearQuests = () => {
        localStorage.setItem("quests", "");
        setQuests([]);
    };

    const editQuest = (quest: Quest, id: string) => {
        setQuests((prevState) => {
            const quests = [...prevState];
            const targetQuest = quests.findIndex((quest) => quest.id === id);
            quests[targetQuest] = quest;
            localStorage.setItem("quests", JSON.stringify(quests));
            return quests;
        });
    };

    const deleteQuest = (id: string) => {
        const filteredQuests = [];
        localStorage.setItem("quests", JSON.stringify(filteredQuests));
        setQuests(filteredQuests);
    };

    const selectQuest = (id: string) => {
        const newSelectedQuest = DUMMY_QUESTS.find((quest) => quest.id === id);
        console.log(newSelectedQuest);

        if (!newSelectedQuest || newSelectedQuest == selectedQuest) {
            setSelectedQuest(null);
            return;
        }
        setSelectedQuest(newSelectedQuest);
    };

    return (
        <QuestContext.Provider
            value={{
                selectedQuest,
                selectQuest,
                quests: DUMMY_QUESTS,
                addQuests,
                editQuest,
                deleteQuest,
                clearQuests,
            }}
        >
            {children}
        </QuestContext.Provider>
    );
};

export default QuestContextProvider;

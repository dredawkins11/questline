import { Stack } from "@mui/material";
import ParentQuestItem from "./ParentQuestItem";
import { useContext } from "react";
import { QuestContext } from "../store/QuestContextProvider";
import QuestItem from "./QuestItem";
import QuestSkeleton from "./QuestSkeleton";

interface QuestListProps {
    loading: boolean;
    setErrorMessage: (value: string) => void;
}

const QuestList = ({ loading, setErrorMessage }: QuestListProps) => {
    const { quests, getChildren } = useContext(QuestContext);
    return (
        <Stack
            width={1}
            height={0.8}
            marginTop={3}
            sx={{ overflowY: "scroll" }}
            padding={1}
        >
            {quests.map((quest) => {
                if (quest.parent) return;
                const questChildren = getChildren(quest.id);
                if (questChildren.length == 0)
                    return <QuestItem setErrorMessage={setErrorMessage} key={quest.id} quest={quest} />;

                return (
                    <ParentQuestItem
                        key={quest.id}
                        quest={quest}
                        children={questChildren}
                    />
                );
            })}
            {loading && <QuestSkeleton />}
        </Stack>
    );
};
export default QuestList;

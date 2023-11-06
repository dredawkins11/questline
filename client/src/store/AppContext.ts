import { createContext } from "react";
import { Quest } from "../types";

interface AppContext {
    error: Error | null;
    setError: (value: Error | null) => void;
}

const AppContext = createContext<AppContext>({
    error: null,
    setError: (_value: Error | null) => {},
});

export default AppContext
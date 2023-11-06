import { useState } from "react";
import AppContext from "./AppContext";

interface AppContextProviderProps {
    children: React.ReactNode;
}


const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [error, setError] = useState<Error | null>(null);

    const contextValue = {
        error,
        setError: (value: Error | null) => setError(value),
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export {AppContextProvider, AppContext};

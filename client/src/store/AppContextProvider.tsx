import { createContext, useState } from "react";

interface AppContextProviderProps {
    children: React.ReactNode;
}

interface AppContext {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    stepAmount: number;
    setStepAmount: (value: number) => void;
    error: Error | null;
    setError: (value: Error | null) => void;
}

const AppContext = createContext<AppContext>({
    darkMode: true,
    setDarkMode: (_value: boolean) => {},
    stepAmount: 5,
    setStepAmount: (_value: number) => {},
    error: null,
    setError: (_value: Error | null) => {},
});

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [darkMode, setDarkMode] = useState(true);
    const [stepAmount, setStepAmount] = useState(5);
    const [error, setError] = useState<Error | null>(null);

    const contextValue = {
        darkMode: darkMode,
        setDarkMode: (value: boolean) => setDarkMode(value),
        stepAmount: stepAmount,
        setStepAmount: (value: number) => setStepAmount(value),
        error: error,
        setError: (value: Error | null) => setError(value),
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export {AppContextProvider, AppContext};

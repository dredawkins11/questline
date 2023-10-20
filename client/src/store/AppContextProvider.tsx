import { createContext, useState } from "react";

interface AppContextProviderProps {
    children: React.ReactNode;
}

interface AppContext {
    theme: string;
    setTheme: (value: string) => void;
    stepAmount: number;
    setStepAmount: (value: number) => void;
    error: Error | null;
    setError: (value: Error | null) => void;
}

const AppContext = createContext<AppContext>({
    theme: "dark",
    setTheme: (value: string) => {},
    stepAmount: 5,
    setStepAmount: (value: number) => {},
    error: null,
    setError: (value: Error | null) => {},
});

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [theme, setTheme] = useState("dark");
    const [stepAmount, setStepAmount] = useState(5);
    const [error, setError] = useState<Error | null>(null);

    const contextValue = {
        theme: theme,
        setTheme: (value: string) => setTheme(value),
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

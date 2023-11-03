import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppContextProvider } from "./store/AppContextProvider.tsx";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*::-webkit-scrollbar": {
                    width: "3px",
                },
                "*::-webkit-scrollbar-track": {
                    WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "*::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(255,255,255,.1)",
                    border: "0 0 solid black",
                    borderRadius: "5px",
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
            <AppContextProvider>
                <App />
            </AppContextProvider>
    </React.StrictMode>
);

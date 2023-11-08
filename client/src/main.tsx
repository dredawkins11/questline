import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppContextProvider } from "./store/AppContextProvider.tsx";
import { CssBaseline, GlobalStyles, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import QuestContextProvider from "./store/QuestContextProvider.tsx";

let theme = createTheme({
    palette: { mode: "dark" },
    typography: {
        fontFamily: "'Inknut Antiqua', serif",
        body2: {
            lineHeight: 1.7
        }
    },
    shape: {
        borderRadius: 10
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
        MuiIconButton: {
            styleOverrides: {
                root: ({theme}) => ({
                    padding: 0,
                    "&:hover": {
                        background: "none",
                        color: theme.palette.primary.main
                    },
                }),
                
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: ({theme}) => ({
                    border: `solid 1px ${theme.palette.text.secondary}`,
                    borderRadius: theme.shape.borderRadius
                })
            }
        }
    },
});

theme = responsiveFontSizes(theme, {factor: 5})

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{"*": {boxSizing: "border-box"}}}/>
            <CssBaseline />
            <AppContextProvider>
                <QuestContextProvider>
                    <App />
                </QuestContextProvider>
            </AppContextProvider>
        </ThemeProvider>
    </React.StrictMode>
);

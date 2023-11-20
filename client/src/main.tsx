import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
    CssBaseline,
    GlobalStyles,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from "@mui/material";

let theme = createTheme({
    palette: { mode: "dark",
        primary: {
            main: "#f09832"
        }
    },
    typography: {
        fontFamily: "'Philosopher', sans-serif",
        fontSize: 16,
        body2: {
            lineHeight: 1.7,
        },
    },
    shape: {
        borderRadius: 10,
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
                root: ({ theme }) => ({
                    padding: 0,
                    transition: "color .2s",
                    "&:hover": {
                        background: "none",
                        color: theme.palette.primary.main,
                    },
                }),
            },
        },
        MuiButton: {
            variants: [
                {
                    props: {variant: "text"},
                    style: ({theme}) => ({
                        color: theme.palette.text.primary,
                        transition: "color .2s",
                        "&:hover": {
                            color: theme.palette.primary.main,
                            background: "none"
                        }
                    })
                }
            ],
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: `solid 1px ${theme.palette.text.secondary}`,
                    borderRadius: theme.shape.borderRadius,
                }),
            },
        },
    },
});

theme = responsiveFontSizes(theme, { factor: 5 });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{ "*": { boxSizing: "border-box" } }} />
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

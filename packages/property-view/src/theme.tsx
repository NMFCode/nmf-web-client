import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    color: 'var(--vscode-editor-foreground)',
                    marginTop: '0.5em',
                    marginBottom: '0.5em',
                },
            },
        },
        MuiFormHelperText:{
            styleOverrides: {
                root: {
                    height: '1em',
                    color: 'var(--vscode-editor-foreground)',
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'var(--vscode-activityBar-border)',
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small'
            },

            styleOverrides: {
                root: {
                    color: 'var(--vscode-editor-foreground)',
                    backgroundColor: 'var(--vscode-editor-background)',
                    borderRadius: '4px',}
                },
            },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: 'var(--vscode-editor-foreground)',
                    }
                }
            },
        MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                '& fieldset': {
                                    borderColor: 'var(--vscode-editor-foreground)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':{
                                    borderColor:'var(--vscode-editorWarning-foreground)'
                                }
                                
                            }
                        }
                    }
        }
    }
);

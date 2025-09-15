import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
    values: {
      xs: 0,
      sm: 300,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
    components: {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    color: 'var(--vscode-editor-foreground)',
                    marginTop: '0.5em',
                },
            },
        },
        MuiFormHelperText:{
            styleOverrides: {
                root: {
                    height: '1em',
                    color: 'green',
                    '&.Mui-focused': {
                        color: 'var(--vscode-progressbar-background)'
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'var(--vscode-textLink-foreground)',
                    '&.MuiInputLabel-shrink':{
                    color:'var(--vscode-statusBarItem-remoteBackground)', 
                }
                
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
                            borderColor:'var(--vscode-statusBarItem-remoteBackground)',
                            
                        }    
                    }
                }
            }
        }
    }
);

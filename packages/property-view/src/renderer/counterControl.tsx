import { JsonSchema } from "@jsonforms/core";
import { Stack, IconButton, TextField, colors, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { withJsonFormsControlProps } from "@jsonforms/react";

interface CounterControlProps {
    data: any;
    handleChange(path: string, value: any): void;
    path: string;
    schema: JsonSchema
}


const INT32_MIN = -2147483648;
const INT32_MAX = 2147483647;

const clampToInt32 = (value: number) => {
  return Math.max(INT32_MIN, Math.min(INT32_MAX, Math.floor(value))) || 0;
};

const CounterControl = ({ data, handleChange, path, schema}: CounterControlProps)=>{
    
    const value = data || schema?.default || 0;

    const increment = () => {
        const newValue = (+value)+1;
        handleChange(path, clampToInt32(newValue));
    }
    const decrement = () => {
         const newValue = (+value)-1;
        handleChange(path, clampToInt32(newValue));
    }

    return(
    <>
    <Typography sx={{color: 'var(--vscode-editor-foreground)'}}>{path}</Typography>
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton onClick={decrement}>
        <RemoveIcon sx={{color: 'var(--vscode-statusBarItem-remoteBackground)'}}/>
      </IconButton>
      <TextField
        value={value}
        inputProps={{ style: { textAlign: "center", width: 80 } }}
        InputProps={{ readOnly: true }}
      />
      <IconButton onClick={increment}>
        <AddIcon sx={{color: 'var(--vscode-statusBarItem-remoteBackground)'}}/>
      </IconButton>
    </Stack>
    </>
    )    
}


export default withJsonFormsControlProps(CounterControl);

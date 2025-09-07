import { withJsonFormsControlProps } from '@jsonforms/react';
import { BorderColor } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';

interface TextFieldControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const TextFieldControl = ({ data, handleChange, path }: TextFieldControlProps)=>{
    const [value, setValue] = React.useState(data);

    return (
    <form onSubmit={(e) => {
        e.preventDefault()
        handleChange(path, value);
    }
    }>
    <TextField id="outlined-basic" label={path} value={value} sx={{color: "--vscode-editor-foreground"}} onBlur={()=>handleChange(path, value) } onChange={(e) => setValue(e.target.value)}
  variant="outlined"/>
    </form>
);
};

export default withJsonFormsControlProps(TextFieldControl);

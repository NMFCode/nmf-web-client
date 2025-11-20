import { JsonSchema } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

interface ArraySelectControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  schema: JsonSchema
}

const ArraySelectControl = ({ data, handleChange, path, schema}: ArraySelectControlProps)=>{
    const value = data  || '';

    const arrayOptions = schema?.oneOf ?? [];

    return (    
        <FormControl size='small' sx={{width: '60%'}}>
            <InputLabel>{path}</InputLabel>
                <Select
                    value={value}
                    label={path}
                    onChange={
                        (e)=>{
                        const newValue = e.target.value;
                        handleChange(path, newValue);
                        }
                    }
                >
                {
                arrayOptions.map((option) => (
                    <MenuItem key={option.const} value={option.const}>{option.title}</MenuItem>
                ))}
        </Select>
        </FormControl>
    );
};

export default withJsonFormsControlProps(ArraySelectControl);

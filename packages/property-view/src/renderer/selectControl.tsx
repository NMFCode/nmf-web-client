import { JsonSchema } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Height } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface SelectControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  schema: JsonSchema
}

const SelectControl = ({ data, handleChange, path, schema}: SelectControlProps)=>{
    const value = data  || '';

    const enumOptions = schema?.enum?? [];

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
                enumOptions.map((option: string) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
        </Select>
        </FormControl>
    );
};

export default withJsonFormsControlProps(SelectControl);

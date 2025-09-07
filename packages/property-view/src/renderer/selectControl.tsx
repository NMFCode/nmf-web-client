import { JsonSchema } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

interface SelectControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  schema: JsonSchema
}

const SelectControl = ({ data, handleChange, path, schema}: SelectControlProps)=>{
    const value = data  || '';

    const enumOptions = schema?.enum ?? schema?.oneOf ?? [];

    return (    
        <FormControl size='small' fullWidth={true}>
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

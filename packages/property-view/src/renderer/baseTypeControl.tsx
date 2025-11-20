import { JsonSchema } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { BorderAllOutlined } from "@mui/icons-material";


interface BaseTypeControlProps{
    data: any;
    handleChange(path: string, value: any): void;
    path: string;
    schema: JsonSchema
}

const BaseTypeControl = ({data, handleChange, path, schema}: BaseTypeControlProps)=>{
    const [selectedBaseTypes, setSelectedBaseTypes] = useState(data ?? []);
    const [filled, setFilled] = useState(true);
    const itemsSchema = schema?.items as any;
    const baseTypes = itemsSchema.oneOf; 
    return <div style={{paddingBottom: '1em'}}>
            <Grid container direction='row' spacing={'20%'}>
                <Grid item>
                    <Typography>{path}</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={()=>{if(filled){ 
                        setSelectedBaseTypes([...selectedBaseTypes, {const:'', title:''}])
                        setFilled(!filled);
                        }}}><AddIcon sx={{color: 'var(--vscode-statusBarItem-remoteBackground)'}}/></IconButton>
                </Grid>
            </Grid>
            {selectedBaseTypes.length === 0? <Typography>Keine BaseTypes vorhanden</Typography> : 
                selectedBaseTypes.map((value: any, index: number)=>(
                    <FormControl size='small' sx={{width: '60%'}}>
                        <Grid container >
                            <Grid item xs={11}>
                                <Select  fullWidth= {true}
                                    value={value}
                                    onChange={
                                        (e)=>{
                                        const changedValue = [...selectedBaseTypes];
                                        changedValue[index] = e.target.value;
                                        setFilled(true);
                                        setSelectedBaseTypes(changedValue);
                                        handleChange(path, changedValue);
                                        }
                                    }
                                >
                                    { baseTypes.map((option: any) => (
                                            <MenuItem key={option.const} value={option.const}>{option.title}</MenuItem>
                                        )) }
                                </Select> 
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={
                                        (e)=>{
                                        const changedValue = [...selectedBaseTypes];
                                        if(changedValue[index].const===''){
                                            setFilled(true);
                                        }
                                        if (index > -1) {
                                        changedValue.splice(index, 1);
                                        }
                                        setSelectedBaseTypes(changedValue);
                                        handleChange(path, changedValue);
                                        }
                                    }><DeleteIcon sx={{color: 'var(--vscode-statusBarItem-remoteBackground)'}}/></IconButton>
                            </Grid>
                        </Grid>
                    </FormControl>
                ))}
        </div>}

export default withJsonFormsControlProps(BaseTypeControl);



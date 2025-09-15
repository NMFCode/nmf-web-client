import { JsonSchema } from "@jsonforms/core"
import { withJsonFormsAllOfProps, withJsonFormsControlProps } from "@jsonforms/react"
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"


interface BoolControlProps{
    schema: JsonSchema,
    data: any,
    handleChange(path: string, value: any):void
    path: string
}

const BoolControl = ({data, schema, handleChange, path}:BoolControlProps)=>{
    return(
    <FormGroup>
        <FormControlLabel control={<Checkbox onChange={()=>handleChange(path, !data)} checked={data} sx={{color: 'var(--vscode-statusBarItem-remoteBackground)','&.Mui-checked': {color: 'var(--vscode-statusBarItem-remoteBackground)',},}}/>} label={path} />
    </FormGroup>
    )
}

export default withJsonFormsControlProps(BoolControl);

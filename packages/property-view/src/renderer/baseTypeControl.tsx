import { JsonSchema } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Grid, IconButton, Typography } from "@mui/material";

interface BaseTypeControlProps{
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  schema: JsonSchema
}

const BaseTypeControl = ({data, handleChange, path, schema}: BaseTypeControlProps)=>{

    return(
        <div>
            <Grid>
                <Typography>path</Typography>
                <IconButton ></IconButton>
            </Grid>

        </div>
    );
}

export default withJsonFormsControlProps(BaseTypeControl);

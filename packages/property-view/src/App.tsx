import './App.css';
import type { PropertyViewObject, PropViewClient} from 'property-views-client';
import { BaseJsonrpcPropViewClient, PropViewWebSocketProvider } from 'property-views-client';
import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';
import type { MessageConnection } from 'vscode-jsonrpc';
import { Grid, Typography } from '@mui/material';
import deepEqual from 'deep-equal';

const port = 5052;
const id = 'prop';

const webSocketUrl = `ws://localhost:${port}/${id}`;

const classes = {
    container: {
        padding: '1em',
        width: '100%',
        backgroundColor: '#cecece',
    },
    dataContent: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.25em',
        marginBottom: '1rem',
        backgroundColor: '#ffffff',
    }
};

let handler: (data: PropertyViewObject[]) => void;
let propViewClient: PropViewClient;
let updating: boolean = false;

const wsProvider = new PropViewWebSocketProvider(webSocketUrl);
wsProvider.listen({ onConnection: initialize, onReconnect: reconnect, logger: console });

function setDataWrapper(dat: unknown) {
    updating = true;
    handler(dat as PropertyViewObject[]);
    updating = false;
}

async function initialize(connectionProvider: MessageConnection, isReconnecting = false): Promise<void> {
    propViewClient = new BaseJsonrpcPropViewClient(setDataWrapper, { id, connectionProvider });
    await propViewClient.start();

    setDataWrapper(propViewClient.selectedElements());

    if (isReconnecting) {
        const message = `Connection to the ${id} property view server got closed. Connection was successfully re-established.`;
        console.log(message);
        return;
    }
}

async function reconnect(connectionProvider: MessageConnection): Promise<void> {
    propViewClient.stop();
    initialize(connectionProvider, true /* isReconnecting */);
}

function sendUpdate(po: PropertyViewObject, data: unknown) {
    if (propViewClient && !updating) {
        if (!deepEqual(po.data, data)) {
            propViewClient.update({
                uri: po.uri,
                data: data
            });
        }
    }
}

const App = () => {

    const [data, setData] = useState<PropertyViewObject[]>([]);
    handler = setData;

    console.log(data.map);

    const forms = data.map(po =>
        <Grid item
            justifyContent={'center'}
            spacing={5}
            sm={12}
            padding={3}
            style={classes.dataContent}
            direction={'column'}>
            <Typography variant={'h4'} align='center'>{po.identifier}</Typography>
            <JsonForms
                schema={po.schema}
                uischema={po.uischema}
                data={po.data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={(updated) => sendUpdate(po, updated.data)}
            />
        </Grid>
    );

    return <Grid container style={classes.container}>{ forms }</Grid>;
};

export default App;

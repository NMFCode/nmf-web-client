import './App.css';
import { PropertyViewObject, PropViewClient } from 'property-views-client';
import { BaseJsonrpcPropViewClient, PropViewWebSocketProvider } from 'property-views-client';
import { useEffect, useRef, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import type { MessageConnection } from 'vscode-jsonrpc';
import { Grid, Typography } from '@mui/material';
import deepEqual from 'deep-equal';
import classControlTester from './renderer/textFieldControlTester';
import classControl from './renderer/textFieldControl';
import selectControlTester from './renderer/selectControlTester';
import selectControl from './renderer/selectControl';
import counterControlTester from './renderer/counterControlTester';
import counterControl from './renderer/counterControl';
import arraySelectControlTest from './renderer/arraySelectControlTest';
import arraySelectController from './renderer/arraySelectControl';
import boolControl from './renderer/boolControl';
import boolControlTester from './renderer/boolControlTester';
import { useMediaQuery } from '@mui/material';
import { theme } from './theme';
import baseTypeControlTester from './renderer/baseTypeControlTester';
import baseTypeControl from './renderer/baseTypeControl';


const port = 5052;
const id = 'prop';
const webSocketUrl = `ws://localhost:${port}/${id}`;

const classes = {  
    container: {
        margin: '1rem',
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--vscode-editor-background)',
        color: 'var(--vscode-editor-foreground)',
    },
    dataContent: {
        margin: '1rem',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'var(--vscode-editor-background)',
        color: 'var(--vscode-editor-foreground)',
    }
};

const renderers = [
    ...materialRenderers,
    {tester: arraySelectControlTest, renderer: arraySelectController},
    {tester: classControlTester, renderer: classControl},
    {tester: selectControlTester, renderer: selectControl},
    {tester: counterControlTester, renderer: counterControl},
    {tester: boolControlTester, renderer: boolControl},
    {tester: baseTypeControlTester, renderer: baseTypeControl}
]

const App = () => {
    const [data, setData] = useState<PropertyViewObject[]>([]);
    const updating = useRef(false);
    const propViewClient = useRef<PropViewClient | null>(null);

    useEffect(() => {
        const wsProvider = new PropViewWebSocketProvider(webSocketUrl);
        console.warn("Provider initialized");

        wsProvider.listen({
            onConnection: initialize,
            onReconnect: reconnect,
            logger: console
        });
    }, []);

    function setDataWrapper(dat: Promise<PropertyViewObject[]> | PropertyViewObject[] | PropertyViewObject | null): void {
        updating.current = true;

        if (dat instanceof Promise) {
            dat.then(resolved => {
                setDataWrapper(resolved);
            }).catch(err => {
                console.error("Failed to resolve Promise in setDataWrapper:", err);
                setData([]);
            }).finally(() => {
                updating.current = false;
            });
            return;
        }

        if (Array.isArray(dat)) {
            setData(dat as PropertyViewObject[]);
        } else if (dat) {
            const po = dat as Partial<PropertyViewObject>;
            if (po.uri && po.data && po.identifier && po.schema && po.uischema) {
                setData([po as PropertyViewObject]);
            } else {
                console.warn("Received object is not a valid PropertyViewObject", po);
                setData([]);
            }
        } else {
            setData([]);
        }

        updating.current = false;
    }

    async function reconnect(connectionProvider: MessageConnection): Promise<void> {
        if (propViewClient.current) {
            propViewClient.current.stop();
        }
        await initialize(connectionProvider, true);
    }

    async function initialize(connectionProvider: MessageConnection, isReconnecting = false): Promise<void> {
        propViewClient.current = new BaseJsonrpcPropViewClient(setDataWrapper, { id, connectionProvider });
        await propViewClient.current.start();
        console.log('Selecting elements');

        setDataWrapper(propViewClient.current.selectedElements());

        if (isReconnecting) {
            console.log(`Connection to the ${id} property view server got closed. Re-established successfully.`);
        }
    };

    function sendUpdate(po: PropertyViewObject, data: unknown) {
        if (propViewClient.current && !updating.current) {
            if (!deepEqual(po.data, data)) {
                propViewClient.current.update({
                    uri: po.uri,
                    data: data
                });
            }
        }
    }

    const forms = Array.isArray(data) ? data.map((po) => (

            <Grid
                item
                key={po.identifier}
                sm={12}
                md={6}
                style={{ ...classes.dataContent}}
                sx={{paddingBottom:'0px'}} 
                direction={'column'}
            >
                <Typography variant="h6" align="left" sx={{maxWidth:'50%'}}>
                    {po.identifier}
                </Typography>
                <JsonForms
                    schema={po.schema}
                    uischema={po.uischema}
                    data={po.data}
                    renderers={renderers}
                    cells={materialCells}
                    onChange={(updated) => sendUpdate(po, updated.data)}
                />
            </Grid>
    )) : null;

    return data.length !== 0 ? <Grid container direction='row' style={classes.container}>{forms}</Grid> : <div style={classes.container}/>;
};

export default App;

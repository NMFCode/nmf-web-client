import './App.css';
import { PropertyViewObject, PropViewClient } from 'property-views-client';
import { BaseJsonrpcPropViewClient, PropViewWebSocketProvider, MultiTransportConnection } from 'property-views-client';
import { useEffect, useRef, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
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
        backgroundColor: 'var(--vscode-editor-background)',
    },
    dataContent: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.25em',
        marginBottom: '1rem',
        backgroundColor: 'white',
    }
};

const App = () => {
    const [data, setData] = useState<PropertyViewObject[]>([]);
    const updating = useRef(false);
    const propViewClient = useRef<PropViewClient | null>(null);

    // MultiTransportConnection erstellen
    const multiConnRef = useRef<MultiTransportConnection>(new MultiTransportConnection(console));

    useEffect(() => {
        const wsProvider = new PropViewWebSocketProvider(webSocketUrl);
        console.warn("Provider initialized");

        // WebSocket mit MultiTransportConnection verbinden
        wsProvider.listen({
            onConnection: initialize,
            onReconnect: reconnect,
            logger: console
        }, multiConnRef.current);

    }, []);

    useEffect(() => {
        console.log("data updated:", data, "isArray:", Array.isArray(data));
    }, [data]);

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
            key={po.identifier}
            item
            justifyContent="center"
            spacing={5}
            sm={12}
            padding={3}
            style={classes.dataContent}
            direction="column"
        >
            <Typography variant="h4" align="left">
                {po.identifier}
            </Typography>
            <JsonForms
                schema={po.schema}
                uischema={po.uischema}
                data={po.data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={(updated) => sendUpdate(po, updated.data)}
            />
        </Grid>
    )) : null;

    return <Grid container style={classes.container}>{forms}</Grid>;
};

export default App;

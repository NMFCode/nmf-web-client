/********************************************************************************
 * Copyright (c) 2021-2024 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import 'reflect-metadata';

import {
    GlspVscodeConnector,
    NavigateAction,
    SocketGlspVscodeServer,
    configureDefaultCommands
} from '@eclipse-glsp/vscode-integration/node';
import * as process from 'process';
import * as vscode from 'vscode';
import NMetaEditorProvider from './nmeta-editor-provider';
import { DotnetGlspSocketServerLauncher } from './dotnet-glsp-socket-server-launcher';
import path = require('path');
import { PropertyViewProvider } from './property-view-provider';

const DEFAULT_SERVER_PORT = '0';
const DOTNET_EXECUTABLE = path.join(__dirname, '..', 'dist', 'NMetaGlspEditor.Server.exe');

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const serverProcess = new DotnetGlspSocketServerLauncher({
        executable: DOTNET_EXECUTABLE,
        socketConnectionOptions: { host: 'localhost', port: JSON.parse(process.env.GLSP_SERVER_PORT || DEFAULT_SERVER_PORT) },
        logging: true
    });

    context.subscriptions.push(serverProcess);

    await serverProcess.start();
    
    // Wrap server with quickstart component
    const nmetaServer =  new SocketGlspVscodeServer({
              clientId: 'vscode',
              clientName: 'vscode',
              connectionOptions: {
                  port: serverProcess?.getPort() || JSON.parse(process.env.GLSP_SERVER_PORT || DEFAULT_SERVER_PORT),
                  path: process.env.GLSP_WEBSOCKET_PATH
              }
          });

    // Initialize GLSP-VSCode connector with server wrapper
    const glspVscodeConnector = new GlspVscodeConnector({
        server: nmetaServer,
        logging: true
    });

    const customEditorProvider = vscode.window.registerCustomEditorProvider(
        'nmeta.glspDiagram',
        new NMetaEditorProvider(context, glspVscodeConnector),
        {
            webviewOptions: { retainContextWhenHidden: true },
            supportsMultipleEditorsPerDocument: false
        }
    );

    vscode.window.registerWebviewViewProvider(
        'nmeta.propertyView',
        new PropertyViewProvider(context),
        {
            webviewOptions: {
                retainContextWhenHidden: true
            }
        }
    );

    context.subscriptions.push(nmetaServer, glspVscodeConnector, customEditorProvider);
    nmetaServer.start();

    configureDefaultCommands({ extensionContext: context, connector: glspVscodeConnector, diagramPrefix: 'nmeta' });

    context.subscriptions.push(
        vscode.commands.registerCommand('nmeta.goToNextNode', () => {
            glspVscodeConnector.dispatchAction(NavigateAction.create('next'));
        }),
        vscode.commands.registerCommand('nmeta.goToPreviousNode', () => {
            glspVscodeConnector.dispatchAction(NavigateAction.create('previous'));
        }),
        vscode.commands.registerCommand('nmeta.showDocumentation', () => {
            glspVscodeConnector.dispatchAction(NavigateAction.create('documentation'));
        })
    );
}

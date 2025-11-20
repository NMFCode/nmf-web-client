/* eslint-disable @typescript-eslint/consistent-type-imports */

import { createNMetaDiagramContainer } from 'nmeta-glsp-client';
import { ContainerConfiguration } from '@eclipse-glsp/client';
import { GLSPStarter } from '@eclipse-glsp/vscode-integration-webview';
import { Container } from 'inversify';
import 'reflect-metadata';
import '@eclipse-glsp/vscode-integration-webview/css/glsp-vscode.css';
import '../css/diagram.css';

class NMetaGLSPStarter extends GLSPStarter {

    createContainer(...containerConfiguration: ContainerConfiguration): Container {
        return createNMetaDiagramContainer(new Container(),...containerConfiguration);
    }
}

export function launch(): void {
    new NMetaGLSPStarter();
}

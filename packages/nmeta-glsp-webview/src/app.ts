/* eslint-disable @typescript-eslint/consistent-type-imports */

import { createNMetaDiagramContainer } from 'nmeta-glsp-client';
import { ContainerConfiguration } from '@eclipse-glsp/client';
import { GLSPStarter } from '@eclipse-glsp/vscode-integration-webview';
import '@eclipse-glsp/vscode-integration-webview/css/glsp-vscode.css';
import '@vscode/codicons/dist/codicon.css';
import { Container } from 'inversify';

class NMetaGLSPStarter extends GLSPStarter {
    createContainer(...containerConfiguration: ContainerConfiguration): Container {
        return createNMetaDiagramContainer(...containerConfiguration);
    }
}

export function launch(): void {
    new NMetaGLSPStarter();
}

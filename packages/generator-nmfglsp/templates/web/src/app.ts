/* eslint-disable @typescript-eslint/consistent-type-imports */

import { create<%= LanguageName %>DiagramContainer } from '<%= language-id %>-glsp-client';
import { ContainerConfiguration } from '@eclipse-glsp/client';
import { GLSPStarter } from '@eclipse-glsp/vscode-integration-webview';
import '@eclipse-glsp/vscode-integration-webview/css/glsp-vscode.css';
import '@vscode/codicons/dist/codicon.css';
import { Container } from 'inversify';

class <%= LanguageName %>GLSPStarter extends GLSPStarter {
    createContainer(...containerConfiguration: ContainerConfiguration): Container {
        return create<%= LanguageName %>DiagramContainer(...containerConfiguration);
    }
}

export function launch(): void {
    new <%= LanguageName %>GLSPStarter();
}

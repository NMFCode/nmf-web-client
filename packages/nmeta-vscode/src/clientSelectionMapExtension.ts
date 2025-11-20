import { GlspVscodeConnector } from "@eclipse-glsp/vscode-integration";
import { SelectionState } from "@eclipse-glsp/vscode-integration";

export class ExtendedGlspVsCodeConnector extends GlspVscodeConnector{
    public getClientID(state: SelectionState): string {
        for (const [key, value] of this.clientSelectionMap.entries()) {
            if (value === state) {
                return key;
            }
        }
        return '';
    }
}

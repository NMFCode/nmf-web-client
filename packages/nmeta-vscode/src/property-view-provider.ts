import { WebviewViewProvider, WebviewView, window, WebviewViewResolveContext, CancellationToken, ExtensionContext } from "vscode";

export class PropertyViewProvider implements WebviewViewProvider
{
	public static readonly viewType = 'nmeta.propertyView';

	private view?: WebviewView;

	constructor(protected readonly extensionContext: ExtensionContext)
	{
	}

    register()
	{
		return window.registerWebviewViewProvider(PropertyViewProvider.viewType, this);
	}

	async resolveWebviewView(
		webviewView: WebviewView,
		context: WebviewViewResolveContext<unknown>,
		token: CancellationToken
	): Promise<void>
	{
		this.view = webviewView;
		const webview = this.view.webview;

        const extensionUri = this.extensionContext.extensionUri;

		webview.options = {
			enableScripts: true,
			localResourceRoots: [extensionUri],
		};

        webview.html = `
            <!doctype html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link
                      rel="stylesheet"
                      href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <title>Properties</title>
                    <script type="module" crossorigin src="/property-view/index-By2q0aEp.js"></script>
                    <link rel="stylesheet" crossorigin href="/property-view/index-BYtM6D31.css">
                  </head>
                  <body>
                    <div id="root"></div>
                  </body>
                </html>`;
	}
}

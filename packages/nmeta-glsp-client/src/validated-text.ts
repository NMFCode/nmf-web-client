import {
    AbstractUIExtension,
    Action,
    AutoCompleteWidget,
    DOMHelper,
    EditorContextService,
    GLSPActionDispatcher,
    ILogger,
    LabeledAction,
    ModelIndexImpl,
    RequestContextActions,
    RequestEditValidationAction,
    GModelRoot,
    SetContextActions,
    SetEditValidationResultAction,
    TYPES,
    ValidationDecorator,
    ValidationStatus,
    ViewerOptions,
    getAbsoluteClientBounds,
    toActionArray,
    FeatureModule,
    bindAsService
} from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { DefaultNode } from './model';

@injectable()
export class ValidationEditor extends AbstractUIExtension {
    static readonly ID = 'validation-editor';
    readonly autoSuggestionSettings = {
        noSuggestionsMessage: 'No suggestions available',
        suggestionsClass: 'command-palette-suggestions',
        debounceWaitMs: 50,
        showOnFocus: true
    };

    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    @inject(EditorContextService)
    protected editorContextService: EditorContextService;

    @inject(TYPES.ViewerOptions)
    protected viewerOptions: ViewerOptions;

    @inject(TYPES.DOMHelper)
    protected domHelper: DOMHelper;

    @inject(TYPES.ILogger)
    protected override logger: ILogger;

    protected element: DefaultNode;
    protected autoSuggestion: AutoCompleteWidget;

    id(): string {
        return ValidationEditor.ID;
    }
    containerClass(): string {
        return 'command-palette';
    }

    protected initializeContents(containerElement: HTMLElement): void {
        this.autoSuggestion = new AutoCompleteWidget(
            this.autoSuggestionSettings,
            { provideSuggestions: input => this.retrieveSuggestions(input) },
            { executeFromSuggestion: input => this.executeFromSuggestion(input) },
            () => this.hide(),
            this.logger
        );
        this.autoSuggestion.configureValidation(
            { validate: input => this.validateInput(input) },
            new ValidationDecorator(containerElement)
        );
        this.autoSuggestion.initialize(containerElement);
    }

    override show(root: Readonly<GModelRoot>, ...contextElementIds: string[]): void {
        super.show(root, ...contextElementIds);
        this.autoSuggestion.open(root);
    }

    protected override onBeforeShow(containerElement: HTMLElement, root: Readonly<GModelRoot>, ...contextElementIds: string[]): void {
        this.element = getElement(contextElementIds, root.index)[0];
        this.autoSuggestion.inputField.value = '';
        this.setPosition(containerElement);
    }

    protected setPosition(containerElement: HTMLElement): void {
        let x = 0;
        let y = 0;

        if (this.element) {
            const bounds = getAbsoluteClientBounds(this.element, this.domHelper, this.viewerOptions);
            x = bounds.x + 5;
            y = bounds.y + 5;
        }

        containerElement.style.left = `${x}px`;
        containerElement.style.top = `${y}px`;
        containerElement.style.width = '200px';
    }

    protected async retrieveSuggestions(input: string): Promise<LabeledAction[]> {
        const response = await this.actionDispatcher.request(
            RequestContextActions.create({ contextId: ValidationEditor.ID, editorContext: this.editorContextService.get({ ['text']: input }) })
        );
        if (SetContextActions.is(response)) {
            return response.actions;
        }
        return Promise.reject();
    }

    protected async validateInput(input: string): Promise<ValidationStatus> {
        const response = await this.actionDispatcher.request(
            RequestEditValidationAction.create({ contextId: ValidationEditor.ID, modelElementId: this.element.id, text: input })
        );
        if (SetEditValidationResultAction.is(response)) {
            return response.status;
        }
        return Promise.reject();
    }

    protected executeFromSuggestion(input: LabeledAction | Action[] | Action): void {
        this.actionDispatcher.dispatchAll(toActionArray(input));
    }

    override hide(): void {
        this.autoSuggestion.dispose();
        super.hide();
    }
}


function getElement(ids: string[], index: ModelIndexImpl): DefaultNode[] {
    return ids.map(id => index.getById(id)).filter(element => element) as DefaultNode[];
}

export const validatedEditor = new FeatureModule((bind, _unbind, _isBound) => {
    bindAsService(bind, TYPES.IUIExtension, ValidationEditor);
});

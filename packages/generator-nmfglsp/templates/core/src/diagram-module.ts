import {
    ConsoleLogger,
    ContainerConfiguration,
    DeleteElementContextMenuItemProvider,
    GridSnapper,
    LogLevel,
    RevealNamedElementActionProvider,
    GCompartment,
    GCompartmentView,
    TYPES,
    bindAsService,
    bindOrRebind,
    configureDefaultModelElements,
    configureModelElement,
    initializeDiagramContainer,
} from '@eclipse-glsp/client';
import 'balloon-css/balloon.min.css';
import { Container, ContainerModule } from 'inversify';
import 'sprotty/css/edit-label.css';
import '../css/diagram.css';
import { ContextMenuService } from './menu';

export const <%= LanguageName %>DiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    const context = { bind, unbind, isBound, rebind };

    bindOrRebind(context, TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    bindOrRebind(context, TYPES.LogLevel).toConstantValue(LogLevel.warn);
    bind(TYPES.ISnapper).to(GridSnapper);
    bindAsService(context, TYPES.ICommandPaletteActionProvider, RevealNamedElementActionProvider);
    bindAsService(context, TYPES.IContextMenuItemProvider, DeleteElementContextMenuItemProvider);
    bindOrRebind(context, TYPES.IContextMenuService).to(ContextMenuService);

    configureDefaultModelElements(context);
    configureModelElement(context, 'comp:header', GCompartment, GCompartmentView);
    // TODO: configure model elements
});

export function create<%= LanguageName %>DiagramContainer(...containerConfiguration: ContainerConfiguration): Container {
    return initializeDiagramContainer(new Container(), <%= LanguageName %>DiagramModule, ...containerConfiguration);
}

import {
    ConsoleLogger,
    ContainerConfiguration,
    DeleteElementContextMenuItemProvider,
    GridSnapper,
    LogLevel,
    RevealNamedElementActionProvider,
    GLabelView,
    TYPES,
    bindAsService,
    bindOrRebind,
    configureDefaultModelElements,
    configureModelElement,
    initializeDiagramContainer,
    GEdge,
    PolylineEdgeViewWithGapsOnIntersections,
    DefaultTypes,
    GGraph,
} from '@eclipse-glsp/client';
import 'balloon-css/balloon.min.css';
import { Container, ContainerModule } from 'inversify';
import 'sprotty/css/edit-label.css';
import '../css/diagram.css';
import { ElementLabel, DefaultNode, EdgeLabel } from './model';
import { ContextMenuService } from './menu';
import { FinalStateView, StartStateView, StateMachineGraph, StateView } from './views';

export const <%= LanguageNameCamel %>DiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    const context = { bind, unbind, isBound, rebind };

    bindOrRebind(context, TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    bindOrRebind(context, TYPES.LogLevel).toConstantValue(LogLevel.warn);
    bind(TYPES.ISnapper).to(GridSnapper);
    bindAsService(context, TYPES.ICommandPaletteActionProvider, RevealNamedElementActionProvider);
    bindAsService(context, TYPES.IContextMenuItemProvider, DeleteElementContextMenuItemProvider);
    bindOrRebind(context, TYPES.IContextMenuService).to(ContextMenuService);

    configureDefaultModelElements(context);
    configureModelElement(context, DefaultTypes.GRAPH, GGraph, StateMachineGraph);
    configureModelElement(context, 'Transition', GEdge, PolylineEdgeViewWithGapsOnIntersections);
    configureModelElement(context, 'label:heading', ElementLabel, GLabelView);
    configureModelElement(context, 'label:edge', EdgeLabel, GLabelView);
    configureModelElement(context, 'State', DefaultNode, StateView);
    configureModelElement(context, 'FinalState', DefaultNode, FinalStateView);
    configureModelElement(context, 'StartState', DefaultNode, StartStateView);
});

export function create<%= LanguageName %>DiagramContainer(...containerConfiguration: ContainerConfiguration): Container {
    return initializeDiagramContainer(new Container(), <%= LanguageNameCamel %>DiagramModule, ...containerConfiguration);
}

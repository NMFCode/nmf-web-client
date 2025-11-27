import {
    ConsoleLogger,
    ContainerConfiguration,
    DeleteElementContextMenuItemProvider,
    GEdge,
    GridSnapper,
    LogLevel,
    RevealNamedElementActionProvider,
    GCompartment,
    GCompartmentView,
    GLabelView,
    TYPES,
    bindAsService,
    bindOrRebind,
    configureDefaultModelElements,
    configureModelElement,
    initializeDiagramContainer,
    RectangularNodeView,
} from '@eclipse-glsp/client';
import 'balloon-css/balloon.min.css';
import { Container, ContainerModule } from 'inversify';
import 'sprotty/css/edit-label.css';
import '../css/diagram.css';
import { AttributeLabel, DefaultNode, ElementLabel } from './model';
import { DividerView, InheritanceEdgeView, ReferenceEdgeView } from './views';
import { ContextMenuService } from './menu';

export const <%= language-id %>DiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
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
    return initializeDiagramContainer(new Container(), <%= language-id %>DiagramModule, ...containerConfiguration);
}

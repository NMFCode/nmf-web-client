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
    GLabel,
    deletableFeature,
    editLabelFeature,
    selectFeature,
    DefaultTypes,
} from '@eclipse-glsp/client';
import 'balloon-css/balloon.min.css';
import { Container, ContainerModule } from 'inversify';
import { DefaultNode } from './model';
import { DividerView, InheritanceEdgeView, ReferenceEdgeView } from './views';
import { ContextMenuService } from './menu';
import { validatedEditor } from './validated-text';
import '../css/diagram.css'

export const nmetaDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    const context = { bind, unbind, isBound, rebind };
    bindOrRebind(context, TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    bindOrRebind(context, TYPES.LogLevel).toConstantValue(LogLevel.warn);
    bind(TYPES.ISnapper).to(GridSnapper);
    bindAsService(context, TYPES.ICommandPaletteActionProvider, RevealNamedElementActionProvider);
    bindAsService(context, TYPES.IContextMenuItemProvider, DeleteElementContextMenuItemProvider);
    bindOrRebind(context, TYPES.IContextMenuService).to(ContextMenuService);

    configureDefaultModelElements(context);
    configureModelElement(context, DefaultTypes.LABEL, GLabel, GLabelView, {enable: [editLabelFeature, selectFeature, deletableFeature]});
    configureModelElement(context, 'label:static', GLabel, GLabelView);
    configureModelElement(context, 'comp:header', GCompartment, GCompartmentView);
    configureModelElement(context, 'comp:attributes', GCompartment, GCompartmentView);
    configureModelElement(context, 'comp:operations', GCompartment, GCompartmentView);
    configureModelElement(context, 'comp:literals', GCompartment, GCompartmentView);
    configureModelElement(context, 'Class', DefaultNode, RectangularNodeView);
    configureModelElement(context, 'Enumeration', DefaultNode, RectangularNodeView);
    configureModelElement(context, 'Namespace', DefaultNode, RectangularNodeView);
    configureModelElement(context, 'Literal', GLabel, GLabelView, {enable: [editLabelFeature, selectFeature, deletableFeature]});
    configureModelElement(context, 'Attribute', GLabel, GLabelView, {enable: [editLabelFeature, selectFeature, deletableFeature]});
    configureModelElement(context, 'Operation', GLabel, GLabelView, {enable: [editLabelFeature, selectFeature, deletableFeature]});
    configureModelElement(context, 'Reference', GEdge, ReferenceEdgeView);
    configureModelElement(context, 'comp:divider', GCompartment, DividerView);

    configureModelElement(context, 'edge:inheritance', GEdge, InheritanceEdgeView);
});

export function createNMetaDiagramContainer(container: Container, ...containerConfiguration: ContainerConfiguration): Container {
    return initializeDiagramContainer( container, nmetaDiagramModule, validatedEditor, ...containerConfiguration);
}

import {
    CircularNodeView,
    GLSPProjectionView,
    GViewportRootElement,
    IViewArgs,
    RenderingContext,
    ShapeView,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    svg,
    TYPES,
    ViewerOptions,
} from '@eclipse-glsp/client';
import { VNode, VNodeStyle, h } from 'snabbdom';
import { DefaultNode } from './model';
import { inject, injectable } from 'inversify';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JSX = { createElement: svg };

@injectable()
export class StateView extends ShapeView {
    override render(node: DefaultNode, context: RenderingContext, args?: IViewArgs): VNode | undefined {
        if (!this.isVisible(node, context)) {
            return undefined;
        }
        return <g>
            <rect class-sprotty-node
                  class-mouseover={node.hoverFeedback} class-selected={node.selected}
                  x={0} y={0} rx={10} ry={10} width={Math.max(node.size.width, 0)} height={Math.max(node.size.height, 0)}></rect>
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class FinalStateView extends CircularNodeView {
    override render(node: DefaultNode, context: RenderingContext, args?: IViewArgs): VNode | undefined {
        if (!this.isVisible(node, context)) {
            return undefined;
        }

        const radius = this.getRadius(node);
        return <g class-sprotty-node>
            <circle r={radius} cx={radius} cy={radius} />
            <circle fill='#4E81B4' r={radius / 1.5} cx={radius} cy={radius} />
        </g>;
    }
}

@injectable()
export class StartStateView extends CircularNodeView {
    override render(node: DefaultNode, context: RenderingContext, args?: IViewArgs): VNode | undefined {
        if (!this.isVisible(node, context)) {
            return undefined;
        }

        const radius = this.getRadius(node);
        return <g class-sprotty-node>
            <circle r={radius} cx={radius} cy={radius} fill='#4E81B4' />
        </g>;
    }
}


const MARKER_TENT_ID = 'marker-tent';

@injectable()
export class StateMachineGraph extends GLSPProjectionView {
    
    @inject(TYPES.ViewerOptions) protected viewerOptions: ViewerOptions;

    createDefId(id: string): string {
        return `${this.viewerOptions.baseDiv}__svg__${id}`;
    }

    protected override renderSvg(model: Readonly<GViewportRootElement>, context: RenderingContext, _args?: IViewArgs): VNode {
        const edgeRouting = this.edgeRouterRegistry.routeAllChildren(model);
        const transform = `scale(${model.zoom}) translate(${-model.scroll.x},${-model.scroll.y})`;
        const ns = 'http://www.w3.org/2000/svg';
        return h(
            'svg',
            { ns, style: this.renderStyle(context) },
            h('g', { ns, attrs: { transform }, class: { 'svg-defs': true } }, [
                ...this.renderAdditionals(context),
                ...context.renderChildren(model, { edgeRouting })
            ])
        );
    }

    protected renderAdditionals(_context: RenderingContext): VNode[] {
        const directedEdgeAdds: any = [
            <defs>
                <marker
                    id={this.createDefId(MARKER_TENT_ID)}
                    viewBox='0 0 10 10'
                    refX='10'
                    refY='5'
                    markerUnits='userSpaceOnUse'
                    markerWidth='20'
                    markerHeight='20'
                    orient='auto-start-reverse'
                >
                    <path d='M 0 0 L 10 5 L 0 10' stroke='black' fill='none' />
                </marker>
            </defs>
        ];

        return directedEdgeAdds;
    }

    protected renderStyle(_context: RenderingContext): VNodeStyle {
        return {
            height: '100%',
            '--svg-def-marker-tent': `url(#${this.createDefId(MARKER_TENT_ID)})`
        };
    }
}

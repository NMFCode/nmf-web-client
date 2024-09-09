import {
    boundsFeature,
    connectableFeature,
    deletableFeature,
    EditableLabel,
    fadeFeature,
    hoverFeedbackFeature,
    isEditableLabel,
    layoutableChildFeature,
    LayoutContainer,
    layoutContainerFeature,
    moveFeature,
    Nameable,
    nameFeature,
    popupFeature,
    RectangularNode,
    GChildElement,
    selectFeature,
    GShapeElement,
    WithEditableLabel,
    withEditLabelFeature,
    GLabel,
    editLabelFeature,
    Bounds
} from '@eclipse-glsp/client';

export class DefaultNode extends RectangularNode implements Nameable, WithEditableLabel {
    static override readonly DEFAULT_FEATURES = [
        connectableFeature,
        deletableFeature,
        selectFeature,
        boundsFeature,
        moveFeature,
        layoutContainerFeature,
        fadeFeature,
        hoverFeedbackFeature,
        popupFeature,
        nameFeature,
        withEditLabelFeature
    ];

    get editableLabel(): (GChildElement & EditableLabel) | undefined {
        const headerComp = this.children.find(element => element.type === 'comp:header');
        if (headerComp) {
            const label = headerComp.children.find(element => element.type === 'label');
            if (label && isEditableLabel(label)) {
                return label;
            }
        }
        return undefined;
    }

    get name(): string {
        const labelText = this.editableLabel?.text;
        return labelText ? labelText : '<unknown>';
    }

    override get bounds() : Bounds {
        const pos = this.position === undefined ? { x:0, y:0} : this.position;
        const size = this.size === undefined ? { width: 40, height: 20 } : this.size;
        return {
            x: pos.x,
            y: pos.y,
            width: size.width,
            height: size.height
        };
    }
}

export class ElementLabel extends GLabel {
    static override readonly DEFAULT_FEATURES = [
        ...GLabel.DEFAULT_FEATURES,
        editLabelFeature,
        selectFeature,
        deletableFeature
    ];
}

export class EdgeLabel extends GLabel {
    static override readonly DEFAULT_FEATURES = [
        ...GLabel.DEFAULT_FEATURES,
        editLabelFeature,
        moveFeature,
    ];
}

export class Icon extends GShapeElement implements LayoutContainer {
    static readonly DEFAULT_FEATURES = [boundsFeature, layoutContainerFeature, layoutableChildFeature, fadeFeature];

    layout!: string;
    override size = {
        width: 32,
        height: 32
    };
}

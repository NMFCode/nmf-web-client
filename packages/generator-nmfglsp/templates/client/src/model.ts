import {
    boundsFeature,
    connectableFeature,
    deletableFeature,
    EditableLabel,
    fadeFeature,
    hoverFeedbackFeature,
    isEditableLabel,
    layoutContainerFeature,
    moveFeature,
    Nameable,
    nameFeature,
    popupFeature,
    RectangularNode,
    GChildElement,
    selectFeature,
    WithEditableLabel,
    withEditLabelFeature,
    GLabel,
    editLabelFeature
} from '@eclipse-glsp/client';
import '../css/diagram.css'

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
        const label = this.children.find(element => element.type === 'label');
        if (label && isEditableLabel(label)) {
            return label;
        }
        return undefined;
    }

    get name(): string {
        const labelText = this.editableLabel?.text;
        return labelText ? labelText : '<unknown>';
    }
}

export class ElementLabel extends GLabel {
    static override readonly DEFAULT_FEATURES = [
        ...GLabel.DEFAULT_FEATURES,
        editLabelFeature,
        selectFeature
    ];
}

export class EdgeLabel extends GLabel {
    static override readonly DEFAULT_FEATURES = [
        ...GLabel.DEFAULT_FEATURES,
        editLabelFeature,
        moveFeature,
    ];
}

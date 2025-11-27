# GLSP Client

This project implements the actual GLSP client interface, whereas the other projects are wrappers to use the GLSP client either in a standalone web application or as a Visual Studio Code extension.

## Customizing the DSL

The main client configuration of your language is in `diagram-module.ts`. There, you need to tell Sprotty for every type used in the graphical model which type this element should be mapped to and which rendering class should be used in order to translate the graphical model to SVG which is ultimately rendered in the browser.

The class used to represent the model elements can be very generic. It determines the features offered to the user. In the example, the class `DefaultNode` is used for states, but this class can also be used in a more general setting. The file `model.ts` also defines two classes for labels depending on whether they can be moved by the user or not.

The file `views.tsx` contains examples of custom renderers. For some reason, the default rectangular node view does not support rounded corners, so this functionality is implemented in a custom renderer. Furthermore, we also use a custom renderer for the entire graph in order to render markers that are used for the edge targets.

Speaking of edge targets, SVG has the advantage to be stylable via CSS, so you find a `diagram.css` in the `css` folder. For the state machine example, we adjusted the CSS class for edges to always have a tent to mark the end of a transition, but you can of course also separate this in a dedicated CSS class.

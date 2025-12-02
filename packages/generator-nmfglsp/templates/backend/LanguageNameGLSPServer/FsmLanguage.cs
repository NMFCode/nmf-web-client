using NMF.Glsp.Language;
using NMF.Glsp.Language.Layouting;
using NMF.Collections;
using NMF.Expressions.Linq;
using <%= LanguageName %>.FiniteStateMachines;

namespace <%= LanguageName %>
{
    internal class FsmLanguage : GraphicalLanguage
    {
        public override string DiagramType => "<%= language-id %>";

        public override DescriptorBase StartRule => Descriptor<StateMachineDescriptor>();

        public class StateMachineDescriptor : NodeDescriptor<StateMachine>
        {
            protected override void DefineLayout()
            {
                Nodes(D<StateDescriptor>(), m => m.States);
                Edges(D<TransitionDescriptor>(), m => m.States.SelectMany(s => s.Outgoing).IgnoreUpdates());
            }
        }

        public class StateDescriptor : NodeDescriptor<IState>
        {
            protected override void DefineLayout()
            {
                Layout(LayoutStrategy.Vbox);
                Label(s => s.Name, "label:heading");
            }

            public override IState CreateElement(string profile, object parent)
            {
                return new State
                {
                    Name = "New State"
                };
            }
        }

        public class FinalStateDescriptor : NodeDescriptor<IFinalState>
        {
            protected override void DefineLayout()
            {
                Refine(D<StateDescriptor>());

                Size(30, 30);
            }
        }

        public class StartStateDescriptor : NodeDescriptor<IStartState>
        {
            protected override void DefineLayout()
            {
                Refine(D<StateDescriptor>());

                Size(20, 20);
            }
        }

        public class TransitionDescriptor : EdgeDescriptor<ITransition>
        {
            protected override void DefineLayout()
            {
                SourceNode(D<StateDescriptor>(), t => t.Source);
                TargetNode(D<StateDescriptor>(), t => t.Target);
                Label(t => t.Trigger)
                    .WithType("label:egde")
                    .Validate((t, newTrigger) => !string.IsNullOrEmpty(newTrigger), "trigger must not be empty")
                    .At(0.5, EdgeSide.Top, offset: 10);
            }

            public override ITransition CreateElement(string profile, object parent)
            {
                return new Transition { Trigger = "(no trigger defined)" };
            }
        }
    }
}

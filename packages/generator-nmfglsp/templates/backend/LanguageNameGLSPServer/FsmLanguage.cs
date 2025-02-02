﻿using NMF.Glsp.Language;
using <%= LanguageName %>.Metamodel;
using NMF.Collections;
using NMF.Expressions.Linq;

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
                Label(s => s.Name, "label:heading").At(30, 15);

                CssClass("task");
                CssClass("manual", s => s.IsFinalState);

                Operation("Toggle final state", (s, _) => s.IsFinalState = !s.IsFinalState);

                Profile("final state", () => new State { IsFinalState = true });
            }
        }

        public class TransitionDescriptor : EdgeDescriptor<ITransition>
        {
            protected override void DefineLayout()
            {
                SourceNode(D<StateDescriptor>(), t => t.Source);
                TargetNode(D<StateDescriptor>(), t => t.Target);
                Label(t => t.Trigger)
                    .WithType("label:heading")
                    .Validate((t, newTrigger) => !string.IsNullOrEmpty(newTrigger), "trigger must not be empty")
                    .At(0.5, EdgeSide.Top);
            }

            public override ITransition CreateElement(string profile, object parent)
            {
                return new Transition { Trigger = "(no trigger defined)" };
            }
        }
    }
}

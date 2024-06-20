//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:6.0.25
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using NMF.Collections.Generic;
using NMF.Collections.ObjectModel;
using NMF.Expressions;
using NMF.Expressions.Linq;
using NMF.Models;
using NMF.Models.Collections;
using NMF.Models.Expressions;
using NMF.Models.Meta;
using NMF.Models.Repository;
using NMF.Serialization;
using NMF.Utilities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;

namespace <%= LanguageName %>.Metamodel
{
    
    
    /// <summary>
    /// The default implementation of the Transition class
    /// </summary>
    [XmlNamespaceAttribute("about:fsm")]
    [XmlNamespacePrefixAttribute("fsm")]
    [ModelRepresentationClassAttribute("about:fsm#//Transition")]
    public partial class Transition : ModelElement, ITransition, IModelElement
    {
        
        /// <summary>
        /// The backing field for the Trigger property
        /// </summary>
        [DebuggerBrowsableAttribute(DebuggerBrowsableState.Never)]
        private string _trigger;
        
        private static Lazy<ITypedElement> _triggerAttribute = new Lazy<ITypedElement>(RetrieveTriggerAttribute);
        
        private static Lazy<ITypedElement> _sourceReference = new Lazy<ITypedElement>(RetrieveSourceReference);
        
        private static Lazy<ITypedElement> _targetReference = new Lazy<ITypedElement>(RetrieveTargetReference);
        
        /// <summary>
        /// The backing field for the Target property
        /// </summary>
        [DebuggerBrowsableAttribute(DebuggerBrowsableState.Never)]
        private IState _target;
        
        private static IClass _classInstance;
        
        /// <summary>
        /// The trigger property
        /// </summary>
        [DisplayNameAttribute("trigger")]
        [CategoryAttribute("Transition")]
        [XmlElementNameAttribute("trigger")]
        [XmlAttributeAttribute(true)]
        public string Trigger
        {
            get
            {
                return this._trigger;
            }
            set
            {
                if ((this._trigger != value))
                {
                    string old = this._trigger;
                    ValueChangedEventArgs e = new ValueChangedEventArgs(old, value);
                    this.OnTriggerChanging(e);
                    this.OnPropertyChanging("Trigger", e, _triggerAttribute);
                    this._trigger = value;
                    this.OnTriggerChanged(e);
                    this.OnPropertyChanged("Trigger", e, _triggerAttribute);
                }
            }
        }
        
        /// <summary>
        /// The source property
        /// </summary>
        [BrowsableAttribute(false)]
        [XmlElementNameAttribute("source")]
        [DesignerSerializationVisibilityAttribute(DesignerSerializationVisibility.Hidden)]
        [XmlAttributeAttribute(true)]
        [XmlOppositeAttribute("outgoing")]
        public IState Source
        {
            get
            {
                return ModelHelper.CastAs<IState>(this.Parent);
            }
            set
            {
                this.Parent = value;
            }
        }
        
        /// <summary>
        /// The target property
        /// </summary>
        [DisplayNameAttribute("target")]
        [CategoryAttribute("Transition")]
        [XmlElementNameAttribute("target")]
        [XmlAttributeAttribute(true)]
        [XmlOppositeAttribute("incoming")]
        public IState Target
        {
            get
            {
                return this._target;
            }
            set
            {
                if ((this._target != value))
                {
                    IState old = this._target;
                    ValueChangedEventArgs e = new ValueChangedEventArgs(old, value);
                    this.OnTargetChanging(e);
                    this.OnPropertyChanging("Target", e, _targetReference);
                    this._target = value;
                    if ((old != null))
                    {
                        old.Incoming.Remove(this);
                        old.Deleted -= this.OnResetTarget;
                    }
                    if ((value != null))
                    {
                        value.Incoming.Add(this);
                        value.Deleted += this.OnResetTarget;
                    }
                    this.OnTargetChanged(e);
                    this.OnPropertyChanged("Target", e, _targetReference);
                }
            }
        }
        
        /// <summary>
        /// Gets the referenced model elements of this model element
        /// </summary>
        public override IEnumerableExpression<IModelElement> ReferencedElements
        {
            get
            {
                return base.ReferencedElements.Concat(new TransitionReferencedElementsCollection(this));
            }
        }
        
        /// <summary>
        /// Gets the Class model for this type
        /// </summary>
        public new static IClass ClassInstance
        {
            get
            {
                if ((_classInstance == null))
                {
                    _classInstance = ((IClass)(MetaRepository.Instance.Resolve("about:fsm#//Transition")));
                }
                return _classInstance;
            }
        }
        
        /// <summary>
        /// Gets fired when the Trigger property changed its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> TriggerChanged;
        
        /// <summary>
        /// Gets fired before the Trigger property changes its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> TriggerChanging;
        
        /// <summary>
        /// Gets fired before the Source property changes its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> SourceChanging;
        
        /// <summary>
        /// Gets fired when the Source property changed its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> SourceChanged;
        
        /// <summary>
        /// Gets fired before the Target property changes its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> TargetChanging;
        
        /// <summary>
        /// Gets fired when the Target property changed its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> TargetChanged;
        
        private static ITypedElement RetrieveTriggerAttribute()
        {
            return ((ITypedElement)(((ModelElement)(LanguageName.Metamodel.Transition.ClassInstance)).Resolve("trigger")));
        }
        
        /// <summary>
        /// Raises the TriggerChanged event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnTriggerChanged(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.TriggerChanged;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        /// <summary>
        /// Raises the TriggerChanging event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnTriggerChanging(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.TriggerChanging;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        private static ITypedElement RetrieveSourceReference()
        {
            return ((ITypedElement)(((ModelElement)(LanguageName.Metamodel.Transition.ClassInstance)).Resolve("source")));
        }
        
        /// <summary>
        /// Raises the SourceChanging event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnSourceChanging(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.SourceChanging;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        /// <summary>
        /// Gets called when the parent model element of the current model element is about to change
        /// </summary>
        /// <param name="oldParent">The old parent model element</param>
        /// <param name="newParent">The new parent model element</param>
        protected override void OnParentChanging(IModelElement newParent, IModelElement oldParent)
        {
            IState oldSource = ModelHelper.CastAs<IState>(oldParent);
            IState newSource = ModelHelper.CastAs<IState>(newParent);
            ValueChangedEventArgs e = new ValueChangedEventArgs(oldSource, newSource);
            this.OnSourceChanging(e);
            this.OnPropertyChanging("Source", e, _sourceReference);
        }
        
        /// <summary>
        /// Raises the SourceChanged event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnSourceChanged(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.SourceChanged;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        /// <summary>
        /// Gets called when the parent model element of the current model element changes
        /// </summary>
        /// <param name="oldParent">The old parent model element</param>
        /// <param name="newParent">The new parent model element</param>
        protected override void OnParentChanged(IModelElement newParent, IModelElement oldParent)
        {
            IState oldSource = ModelHelper.CastAs<IState>(oldParent);
            IState newSource = ModelHelper.CastAs<IState>(newParent);
            if ((oldSource != null))
            {
                oldSource.Outgoing.Remove(this);
            }
            if ((newSource != null))
            {
                newSource.Outgoing.Add(this);
            }
            ValueChangedEventArgs e = new ValueChangedEventArgs(oldSource, newSource);
            this.OnSourceChanged(e);
            this.OnPropertyChanged("Source", e, _sourceReference);
            base.OnParentChanged(newParent, oldParent);
        }
        
        private static ITypedElement RetrieveTargetReference()
        {
            return ((ITypedElement)(((ModelElement)(LanguageName.Metamodel.Transition.ClassInstance)).Resolve("target")));
        }
        
        /// <summary>
        /// Raises the TargetChanging event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnTargetChanging(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.TargetChanging;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        /// <summary>
        /// Raises the TargetChanged event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnTargetChanged(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.TargetChanged;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        /// <summary>
        /// Handles the event that the Target property must reset
        /// </summary>
        /// <param name="sender">The object that sent this reset request</param>
        /// <param name="eventArgs">The event data for the reset event</param>
        private void OnResetTarget(object sender, System.EventArgs eventArgs)
        {
            this.Target = null;
        }
        
        /// <summary>
        /// Resolves the given URI to a child model element
        /// </summary>
        /// <returns>The model element or null if it could not be found</returns>
        /// <param name="reference">The requested reference name</param>
        /// <param name="index">The index of this reference</param>
        protected override IModelElement GetModelElementForReference(string reference, int index)
        {
            if ((reference == "SOURCE"))
            {
                return this.Source;
            }
            if ((reference == "TARGET"))
            {
                return this.Target;
            }
            return base.GetModelElementForReference(reference, index);
        }
        
        /// <summary>
        /// Resolves the given attribute name
        /// </summary>
        /// <returns>The attribute value or null if it could not be found</returns>
        /// <param name="attribute">The requested attribute name</param>
        /// <param name="index">The index of this attribute</param>
        protected override object GetAttributeValue(string attribute, int index)
        {
            if ((attribute == "TRIGGER"))
            {
                return this.Trigger;
            }
            return base.GetAttributeValue(attribute, index);
        }
        
        /// <summary>
        /// Sets a value to the given feature
        /// </summary>
        /// <param name="feature">The requested feature</param>
        /// <param name="value">The value that should be set to that feature</param>
        protected override void SetFeature(string feature, object value)
        {
            if ((feature == "SOURCE"))
            {
                this.Source = ((IState)(value));
                return;
            }
            if ((feature == "TARGET"))
            {
                this.Target = ((IState)(value));
                return;
            }
            if ((feature == "TRIGGER"))
            {
                this.Trigger = ((string)(value));
                return;
            }
            base.SetFeature(feature, value);
        }
        
        /// <summary>
        /// Gets the property expression for the given attribute
        /// </summary>
        /// <returns>An incremental property expression</returns>
        /// <param name="attribute">The requested attribute in upper case</param>
        protected override NMF.Expressions.INotifyExpression<object> GetExpressionForAttribute(string attribute)
        {
            if ((attribute == "TRIGGER"))
            {
                return new TriggerProxy(this);
            }
            return base.GetExpressionForAttribute(attribute);
        }
        
        /// <summary>
        /// Gets the property expression for the given reference
        /// </summary>
        /// <returns>An incremental property expression</returns>
        /// <param name="reference">The requested reference in upper case</param>
        protected override NMF.Expressions.INotifyExpression<NMF.Models.IModelElement> GetExpressionForReference(string reference)
        {
            if ((reference == "SOURCE"))
            {
                return new SourceProxy(this);
            }
            if ((reference == "TARGET"))
            {
                return new TargetProxy(this);
            }
            return base.GetExpressionForReference(reference);
        }
        
        /// <summary>
        /// Gets the Class for this model element
        /// </summary>
        public override IClass GetClass()
        {
            if ((_classInstance == null))
            {
                _classInstance = ((IClass)(MetaRepository.Instance.Resolve("about:fsm#//Transition")));
            }
            return _classInstance;
        }
        
        /// <summary>
        /// The collection class to to represent the children of the Transition class
        /// </summary>
        public class TransitionReferencedElementsCollection : ReferenceCollection, ICollectionExpression<IModelElement>, ICollection<IModelElement>
        {
            
            private Transition _parent;
            
            /// <summary>
            /// Creates a new instance
            /// </summary>
            public TransitionReferencedElementsCollection(Transition parent)
            {
                this._parent = parent;
            }
            
            /// <summary>
            /// Gets the amount of elements contained in this collection
            /// </summary>
            public override int Count
            {
                get
                {
                    int count = 0;
                    if ((this._parent.Source != null))
                    {
                        count = (count + 1);
                    }
                    if ((this._parent.Target != null))
                    {
                        count = (count + 1);
                    }
                    return count;
                }
            }
            
            protected override void AttachCore()
            {
                this._parent.SourceChanged += this.PropagateValueChanges;
                this._parent.TargetChanged += this.PropagateValueChanges;
            }
            
            protected override void DetachCore()
            {
                this._parent.SourceChanged -= this.PropagateValueChanges;
                this._parent.TargetChanged -= this.PropagateValueChanges;
            }
            
            /// <summary>
            /// Adds the given element to the collection
            /// </summary>
            /// <param name="item">The item to add</param>
            public override void Add(IModelElement item)
            {
                if ((this._parent.Source == null))
                {
                    IState sourceCasted = item.As<IState>();
                    if ((sourceCasted != null))
                    {
                        this._parent.Source = sourceCasted;
                        return;
                    }
                }
                if ((this._parent.Target == null))
                {
                    IState targetCasted = item.As<IState>();
                    if ((targetCasted != null))
                    {
                        this._parent.Target = targetCasted;
                        return;
                    }
                }
            }
            
            /// <summary>
            /// Clears the collection and resets all references that implement it.
            /// </summary>
            public override void Clear()
            {
                this._parent.Source = null;
                this._parent.Target = null;
            }
            
            /// <summary>
            /// Gets a value indicating whether the given element is contained in the collection
            /// </summary>
            /// <returns>True, if it is contained, otherwise False</returns>
            /// <param name="item">The item that should be looked out for</param>
            public override bool Contains(IModelElement item)
            {
                if ((item == this._parent.Source))
                {
                    return true;
                }
                if ((item == this._parent.Target))
                {
                    return true;
                }
                return false;
            }
            
            /// <summary>
            /// Copies the contents of the collection to the given array starting from the given array index
            /// </summary>
            /// <param name="array">The array in which the elements should be copied</param>
            /// <param name="arrayIndex">The starting index</param>
            public override void CopyTo(IModelElement[] array, int arrayIndex)
            {
                if ((this._parent.Source != null))
                {
                    array[arrayIndex] = this._parent.Source;
                    arrayIndex = (arrayIndex + 1);
                }
                if ((this._parent.Target != null))
                {
                    array[arrayIndex] = this._parent.Target;
                    arrayIndex = (arrayIndex + 1);
                }
            }
            
            /// <summary>
            /// Removes the given item from the collection
            /// </summary>
            /// <returns>True, if the item was removed, otherwise False</returns>
            /// <param name="item">The item that should be removed</param>
            public override bool Remove(IModelElement item)
            {
                if ((this._parent.Source == item))
                {
                    this._parent.Source = null;
                    return true;
                }
                if ((this._parent.Target == item))
                {
                    this._parent.Target = null;
                    return true;
                }
                return false;
            }
            
            /// <summary>
            /// Gets an enumerator that enumerates the collection
            /// </summary>
            /// <returns>A generic enumerator</returns>
            public override IEnumerator<IModelElement> GetEnumerator()
            {
                return Enumerable.Empty<IModelElement>().Concat(this._parent.Source).Concat(this._parent.Target).GetEnumerator();
            }
        }
        
        /// <summary>
        /// Represents a proxy to represent an incremental access to the trigger property
        /// </summary>
        private sealed class TriggerProxy : ModelPropertyChange<ITransition, string>
        {
            
            /// <summary>
            /// Creates a new observable property access proxy
            /// </summary>
            /// <param name="modelElement">The model instance element for which to create the property access proxy</param>
            public TriggerProxy(ITransition modelElement) : 
                    base(modelElement, "trigger")
            {
            }
            
            /// <summary>
            /// Gets or sets the value of this expression
            /// </summary>
            public override string Value
            {
                get
                {
                    return this.ModelElement.Trigger;
                }
                set
                {
                    this.ModelElement.Trigger = value;
                }
            }
        }
        
        /// <summary>
        /// Represents a proxy to represent an incremental access to the source property
        /// </summary>
        private sealed class SourceProxy : ModelPropertyChange<ITransition, IState>
        {
            
            /// <summary>
            /// Creates a new observable property access proxy
            /// </summary>
            /// <param name="modelElement">The model instance element for which to create the property access proxy</param>
            public SourceProxy(ITransition modelElement) : 
                    base(modelElement, "source")
            {
            }
            
            /// <summary>
            /// Gets or sets the value of this expression
            /// </summary>
            public override IState Value
            {
                get
                {
                    return this.ModelElement.Source;
                }
                set
                {
                    this.ModelElement.Source = value;
                }
            }
        }
        
        /// <summary>
        /// Represents a proxy to represent an incremental access to the target property
        /// </summary>
        private sealed class TargetProxy : ModelPropertyChange<ITransition, IState>
        {
            
            /// <summary>
            /// Creates a new observable property access proxy
            /// </summary>
            /// <param name="modelElement">The model instance element for which to create the property access proxy</param>
            public TargetProxy(ITransition modelElement) : 
                    base(modelElement, "target")
            {
            }
            
            /// <summary>
            /// Gets or sets the value of this expression
            /// </summary>
            public override IState Value
            {
                get
                {
                    return this.ModelElement.Target;
                }
                set
                {
                    this.ModelElement.Target = value;
                }
            }
        }
    }
}


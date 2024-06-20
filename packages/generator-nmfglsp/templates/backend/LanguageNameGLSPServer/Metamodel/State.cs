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
    /// The default implementation of the State class
    /// </summary>
    [XmlIdentifierAttribute("name")]
    [XmlNamespaceAttribute("about:fsm")]
    [XmlNamespacePrefixAttribute("fsm")]
    [ModelRepresentationClassAttribute("about:fsm#//State")]
    [DebuggerDisplayAttribute("State {Name}")]
    public partial class State : ModelElement, IState, IModelElement
    {
        
        /// <summary>
        /// The backing field for the Name property
        /// </summary>
        [DebuggerBrowsableAttribute(DebuggerBrowsableState.Never)]
        private string _name;
        
        private static Lazy<ITypedElement> _nameAttribute = new Lazy<ITypedElement>(RetrieveNameAttribute);
        
        /// <summary>
        /// The backing field for the IsFinalState property
        /// </summary>
        [DebuggerBrowsableAttribute(DebuggerBrowsableState.Never)]
        private bool _isFinalState;
        
        private static Lazy<ITypedElement> _isFinalStateAttribute = new Lazy<ITypedElement>(RetrieveIsFinalStateAttribute);
        
        private static Lazy<ITypedElement> _outgoingReference = new Lazy<ITypedElement>(RetrieveOutgoingReference);
        
        /// <summary>
        /// The backing field for the Outgoing property
        /// </summary>
        [DebuggerBrowsableAttribute(DebuggerBrowsableState.Never)]
        private StateOutgoingCollection _outgoing;
        
        private static Lazy<ITypedElement> _incomingReference = new Lazy<ITypedElement>(RetrieveIncomingReference);
        
        /// <summary>
        /// The backing field for the Incoming property
        /// </summary>
        [DebuggerBrowsableAttribute(DebuggerBrowsableState.Never)]
        private StateIncomingCollection _incoming;
        
        private static IClass _classInstance;
        
        public State()
        {
            this._outgoing = new StateOutgoingCollection(this);
            this._outgoing.CollectionChanging += this.OutgoingCollectionChanging;
            this._outgoing.CollectionChanged += this.OutgoingCollectionChanged;
            this._incoming = new StateIncomingCollection(this);
            this._incoming.CollectionChanging += this.IncomingCollectionChanging;
            this._incoming.CollectionChanged += this.IncomingCollectionChanged;
        }
        
        /// <summary>
        /// The name property
        /// </summary>
        [DisplayNameAttribute("name")]
        [CategoryAttribute("State")]
        [XmlElementNameAttribute("name")]
        [IdAttribute()]
        [XmlAttributeAttribute(true)]
        public string Name
        {
            get
            {
                return this._name;
            }
            set
            {
                if ((this._name != value))
                {
                    string old = this._name;
                    ValueChangedEventArgs e = new ValueChangedEventArgs(old, value);
                    this.OnNameChanging(e);
                    this.OnPropertyChanging("Name", e, _nameAttribute);
                    this._name = value;
                    this.OnNameChanged(e);
                    this.OnPropertyChanged("Name", e, _nameAttribute);
                }
            }
        }
        
        /// <summary>
        /// The isFinalState property
        /// </summary>
        [TypeConverterAttribute(typeof(LowercaseBooleanConverter))]
        [DisplayNameAttribute("isFinalState")]
        [CategoryAttribute("State")]
        [XmlElementNameAttribute("isFinalState")]
        [XmlAttributeAttribute(true)]
        public bool IsFinalState
        {
            get
            {
                return this._isFinalState;
            }
            set
            {
                if ((this._isFinalState != value))
                {
                    bool old = this._isFinalState;
                    ValueChangedEventArgs e = new ValueChangedEventArgs(old, value);
                    this.OnIsFinalStateChanging(e);
                    this.OnPropertyChanging("IsFinalState", e, _isFinalStateAttribute);
                    this._isFinalState = value;
                    this.OnIsFinalStateChanged(e);
                    this.OnPropertyChanged("IsFinalState", e, _isFinalStateAttribute);
                }
            }
        }
        
        /// <summary>
        /// The outgoing property
        /// </summary>
        [DesignerSerializationVisibilityAttribute(DesignerSerializationVisibility.Content)]
        [BrowsableAttribute(false)]
        [XmlElementNameAttribute("outgoing")]
        [XmlAttributeAttribute(false)]
        [ContainmentAttribute()]
        [XmlOppositeAttribute("source")]
        [ConstantAttribute()]
        public IOrderedSetExpression<ITransition> Outgoing
        {
            get
            {
                return this._outgoing;
            }
        }
        
        /// <summary>
        /// The incoming property
        /// </summary>
        [DesignerSerializationVisibilityAttribute(DesignerSerializationVisibility.Content)]
        [DisplayNameAttribute("incoming")]
        [CategoryAttribute("State")]
        [XmlElementNameAttribute("incoming")]
        [XmlAttributeAttribute(true)]
        [XmlOppositeAttribute("target")]
        [ConstantAttribute()]
        public IOrderedSetExpression<ITransition> Incoming
        {
            get
            {
                return this._incoming;
            }
        }
        
        /// <summary>
        /// Gets the child model elements of this model element
        /// </summary>
        public override IEnumerableExpression<IModelElement> Children
        {
            get
            {
                return base.Children.Concat(new StateChildrenCollection(this));
            }
        }
        
        /// <summary>
        /// Gets the referenced model elements of this model element
        /// </summary>
        public override IEnumerableExpression<IModelElement> ReferencedElements
        {
            get
            {
                return base.ReferencedElements.Concat(new StateReferencedElementsCollection(this));
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
                    _classInstance = ((IClass)(MetaRepository.Instance.Resolve("about:fsm#//State")));
                }
                return _classInstance;
            }
        }
        
        /// <summary>
        /// Gets a value indicating whether the current model element can be identified by an attribute value
        /// </summary>
        public override bool IsIdentified
        {
            get
            {
                return true;
            }
        }
        
        /// <summary>
        /// Gets fired when the Name property changed its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> NameChanged;
        
        /// <summary>
        /// Gets fired before the Name property changes its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> NameChanging;
        
        /// <summary>
        /// Gets fired when the IsFinalState property changed its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> IsFinalStateChanged;
        
        /// <summary>
        /// Gets fired before the IsFinalState property changes its value
        /// </summary>
        public event System.EventHandler<ValueChangedEventArgs> IsFinalStateChanging;
        
        private static ITypedElement RetrieveNameAttribute()
        {
            return ((ITypedElement)(((ModelElement)(LanguageName.Metamodel.State.ClassInstance)).Resolve("name")));
        }
        
        /// <summary>
        /// Raises the NameChanged event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnNameChanged(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.NameChanged;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        /// <summary>
        /// Raises the NameChanging event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnNameChanging(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.NameChanging;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        private static ITypedElement RetrieveIsFinalStateAttribute()
        {
            return ((ITypedElement)(((ModelElement)(LanguageName.Metamodel.State.ClassInstance)).Resolve("isFinalState")));
        }
        
        /// <summary>
        /// Raises the IsFinalStateChanged event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnIsFinalStateChanged(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.IsFinalStateChanged;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        /// <summary>
        /// Raises the IsFinalStateChanging event
        /// </summary>
        /// <param name="eventArgs">The event data</param>
        protected virtual void OnIsFinalStateChanging(ValueChangedEventArgs eventArgs)
        {
            System.EventHandler<ValueChangedEventArgs> handler = this.IsFinalStateChanging;
            if ((handler != null))
            {
                handler.Invoke(this, eventArgs);
            }
        }
        
        private static ITypedElement RetrieveOutgoingReference()
        {
            return ((ITypedElement)(((ModelElement)(LanguageName.Metamodel.State.ClassInstance)).Resolve("outgoing")));
        }
        
        /// <summary>
        /// Forwards CollectionChanging notifications for the Outgoing property to the parent model element
        /// </summary>
        /// <param name="sender">The collection that raised the change</param>
        /// <param name="e">The original event data</param>
        private void OutgoingCollectionChanging(object sender, NotifyCollectionChangedEventArgs e)
        {
            this.OnCollectionChanging("Outgoing", e, _outgoingReference);
        }
        
        /// <summary>
        /// Forwards CollectionChanged notifications for the Outgoing property to the parent model element
        /// </summary>
        /// <param name="sender">The collection that raised the change</param>
        /// <param name="e">The original event data</param>
        private void OutgoingCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            this.OnCollectionChanged("Outgoing", e, _outgoingReference);
        }
        
        private static ITypedElement RetrieveIncomingReference()
        {
            return ((ITypedElement)(((ModelElement)(LanguageName.Metamodel.State.ClassInstance)).Resolve("incoming")));
        }
        
        /// <summary>
        /// Forwards CollectionChanging notifications for the Incoming property to the parent model element
        /// </summary>
        /// <param name="sender">The collection that raised the change</param>
        /// <param name="e">The original event data</param>
        private void IncomingCollectionChanging(object sender, NotifyCollectionChangedEventArgs e)
        {
            this.OnCollectionChanging("Incoming", e, _incomingReference);
        }
        
        /// <summary>
        /// Forwards CollectionChanged notifications for the Incoming property to the parent model element
        /// </summary>
        /// <param name="sender">The collection that raised the change</param>
        /// <param name="e">The original event data</param>
        private void IncomingCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            this.OnCollectionChanged("Incoming", e, _incomingReference);
        }
        
        /// <summary>
        /// Gets the relative URI fragment for the given child model element
        /// </summary>
        /// <returns>A fragment of the relative URI</returns>
        /// <param name="element">The element that should be looked for</param>
        protected override string GetRelativePathForNonIdentifiedChild(IModelElement element)
        {
            int outgoingIndex = ModelHelper.IndexOfReference(this.Outgoing, element);
            if ((outgoingIndex != -1))
            {
                return ModelHelper.CreatePath("outgoing", outgoingIndex);
            }
            return base.GetRelativePathForNonIdentifiedChild(element);
        }
        
        /// <summary>
        /// Resolves the given URI to a child model element
        /// </summary>
        /// <returns>The model element or null if it could not be found</returns>
        /// <param name="reference">The requested reference name</param>
        /// <param name="index">The index of this reference</param>
        protected override IModelElement GetModelElementForReference(string reference, int index)
        {
            if ((reference == "OUTGOING"))
            {
                if ((index < this.Outgoing.Count))
                {
                    return this.Outgoing[index];
                }
                else
                {
                    return null;
                }
            }
            if ((reference == "INCOMING"))
            {
                if ((index < this.Incoming.Count))
                {
                    return this.Incoming[index];
                }
                else
                {
                    return null;
                }
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
            if ((attribute == "NAME"))
            {
                return this.Name;
            }
            if ((attribute == "ISFINALSTATE"))
            {
                return this.IsFinalState;
            }
            return base.GetAttributeValue(attribute, index);
        }
        
        /// <summary>
        /// Gets the Model element collection for the given feature
        /// </summary>
        /// <returns>A non-generic list of elements</returns>
        /// <param name="feature">The requested feature</param>
        protected override System.Collections.IList GetCollectionForFeature(string feature)
        {
            if ((feature == "OUTGOING"))
            {
                return this._outgoing;
            }
            if ((feature == "INCOMING"))
            {
                return this._incoming;
            }
            return base.GetCollectionForFeature(feature);
        }
        
        /// <summary>
        /// Sets a value to the given feature
        /// </summary>
        /// <param name="feature">The requested feature</param>
        /// <param name="value">The value that should be set to that feature</param>
        protected override void SetFeature(string feature, object value)
        {
            if ((feature == "NAME"))
            {
                this.Name = ((string)(value));
                return;
            }
            if ((feature == "ISFINALSTATE"))
            {
                this.IsFinalState = ((bool)(value));
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
            if ((attribute == "NAME"))
            {
                return new NameProxy(this);
            }
            if ((attribute == "ISFINALSTATE"))
            {
                return Observable.Box(new IsFinalStateProxy(this));
            }
            return base.GetExpressionForAttribute(attribute);
        }
        
        /// <summary>
        /// Gets the property name for the given container
        /// </summary>
        /// <returns>The name of the respective container reference</returns>
        /// <param name="container">The container object</param>
        protected override string GetCompositionName(object container)
        {
            if ((container == this._outgoing))
            {
                return "outgoing";
            }
            return base.GetCompositionName(container);
        }
        
        /// <summary>
        /// Gets the Class for this model element
        /// </summary>
        public override IClass GetClass()
        {
            if ((_classInstance == null))
            {
                _classInstance = ((IClass)(MetaRepository.Instance.Resolve("about:fsm#//State")));
            }
            return _classInstance;
        }
        
        /// <summary>
        /// Gets the identifier string for this model element
        /// </summary>
        /// <returns>The identifier string</returns>
        public override string ToIdentifierString()
        {
            if ((this.Name == null))
            {
                return null;
            }
            return this.Name.ToString();
        }
        
        /// <summary>
        /// The collection class to to represent the children of the State class
        /// </summary>
        public class StateChildrenCollection : ReferenceCollection, ICollectionExpression<IModelElement>, ICollection<IModelElement>
        {
            
            private State _parent;
            
            /// <summary>
            /// Creates a new instance
            /// </summary>
            public StateChildrenCollection(State parent)
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
                    count = (count + this._parent.Outgoing.Count);
                    return count;
                }
            }
            
            protected override void AttachCore()
            {
                this._parent.Outgoing.AsNotifiable().CollectionChanged += this.PropagateCollectionChanges;
            }
            
            protected override void DetachCore()
            {
                this._parent.Outgoing.AsNotifiable().CollectionChanged -= this.PropagateCollectionChanges;
            }
            
            /// <summary>
            /// Adds the given element to the collection
            /// </summary>
            /// <param name="item">The item to add</param>
            public override void Add(IModelElement item)
            {
                ITransition outgoingCasted = item.As<ITransition>();
                if ((outgoingCasted != null))
                {
                    this._parent.Outgoing.Add(outgoingCasted);
                }
            }
            
            /// <summary>
            /// Clears the collection and resets all references that implement it.
            /// </summary>
            public override void Clear()
            {
                this._parent.Outgoing.Clear();
            }
            
            /// <summary>
            /// Gets a value indicating whether the given element is contained in the collection
            /// </summary>
            /// <returns>True, if it is contained, otherwise False</returns>
            /// <param name="item">The item that should be looked out for</param>
            public override bool Contains(IModelElement item)
            {
                if (this._parent.Outgoing.Contains(item))
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
                IEnumerator<IModelElement> outgoingEnumerator = this._parent.Outgoing.GetEnumerator();
                try
                {
                    for (
                    ; outgoingEnumerator.MoveNext(); 
                    )
                    {
                        array[arrayIndex] = outgoingEnumerator.Current;
                        arrayIndex = (arrayIndex + 1);
                    }
                }
                finally
                {
                    outgoingEnumerator.Dispose();
                }
            }
            
            /// <summary>
            /// Removes the given item from the collection
            /// </summary>
            /// <returns>True, if the item was removed, otherwise False</returns>
            /// <param name="item">The item that should be removed</param>
            public override bool Remove(IModelElement item)
            {
                ITransition transitionItem = item.As<ITransition>();
                if (((transitionItem != null) 
                            && this._parent.Outgoing.Remove(transitionItem)))
                {
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
                return Enumerable.Empty<IModelElement>().Concat(this._parent.Outgoing).GetEnumerator();
            }
        }
        
        /// <summary>
        /// The collection class to to represent the children of the State class
        /// </summary>
        public class StateReferencedElementsCollection : ReferenceCollection, ICollectionExpression<IModelElement>, ICollection<IModelElement>
        {
            
            private State _parent;
            
            /// <summary>
            /// Creates a new instance
            /// </summary>
            public StateReferencedElementsCollection(State parent)
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
                    count = (count + this._parent.Outgoing.Count);
                    count = (count + this._parent.Incoming.Count);
                    return count;
                }
            }
            
            protected override void AttachCore()
            {
                this._parent.Outgoing.AsNotifiable().CollectionChanged += this.PropagateCollectionChanges;
                this._parent.Incoming.AsNotifiable().CollectionChanged += this.PropagateCollectionChanges;
            }
            
            protected override void DetachCore()
            {
                this._parent.Outgoing.AsNotifiable().CollectionChanged -= this.PropagateCollectionChanges;
                this._parent.Incoming.AsNotifiable().CollectionChanged -= this.PropagateCollectionChanges;
            }
            
            /// <summary>
            /// Adds the given element to the collection
            /// </summary>
            /// <param name="item">The item to add</param>
            public override void Add(IModelElement item)
            {
                ITransition outgoingCasted = item.As<ITransition>();
                if ((outgoingCasted != null))
                {
                    this._parent.Outgoing.Add(outgoingCasted);
                }
                ITransition incomingCasted = item.As<ITransition>();
                if ((incomingCasted != null))
                {
                    this._parent.Incoming.Add(incomingCasted);
                }
            }
            
            /// <summary>
            /// Clears the collection and resets all references that implement it.
            /// </summary>
            public override void Clear()
            {
                this._parent.Outgoing.Clear();
                this._parent.Incoming.Clear();
            }
            
            /// <summary>
            /// Gets a value indicating whether the given element is contained in the collection
            /// </summary>
            /// <returns>True, if it is contained, otherwise False</returns>
            /// <param name="item">The item that should be looked out for</param>
            public override bool Contains(IModelElement item)
            {
                if (this._parent.Outgoing.Contains(item))
                {
                    return true;
                }
                if (this._parent.Incoming.Contains(item))
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
                IEnumerator<IModelElement> outgoingEnumerator = this._parent.Outgoing.GetEnumerator();
                try
                {
                    for (
                    ; outgoingEnumerator.MoveNext(); 
                    )
                    {
                        array[arrayIndex] = outgoingEnumerator.Current;
                        arrayIndex = (arrayIndex + 1);
                    }
                }
                finally
                {
                    outgoingEnumerator.Dispose();
                }
                IEnumerator<IModelElement> incomingEnumerator = this._parent.Incoming.GetEnumerator();
                try
                {
                    for (
                    ; incomingEnumerator.MoveNext(); 
                    )
                    {
                        array[arrayIndex] = incomingEnumerator.Current;
                        arrayIndex = (arrayIndex + 1);
                    }
                }
                finally
                {
                    incomingEnumerator.Dispose();
                }
            }
            
            /// <summary>
            /// Removes the given item from the collection
            /// </summary>
            /// <returns>True, if the item was removed, otherwise False</returns>
            /// <param name="item">The item that should be removed</param>
            public override bool Remove(IModelElement item)
            {
                ITransition transitionItem = item.As<ITransition>();
                if (((transitionItem != null) 
                            && this._parent.Outgoing.Remove(transitionItem)))
                {
                    return true;
                }
                if (((transitionItem != null) 
                            && this._parent.Incoming.Remove(transitionItem)))
                {
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
                return Enumerable.Empty<IModelElement>().Concat(this._parent.Outgoing).Concat(this._parent.Incoming).GetEnumerator();
            }
        }
        
        /// <summary>
        /// Represents a proxy to represent an incremental access to the name property
        /// </summary>
        private sealed class NameProxy : ModelPropertyChange<IState, string>
        {
            
            /// <summary>
            /// Creates a new observable property access proxy
            /// </summary>
            /// <param name="modelElement">The model instance element for which to create the property access proxy</param>
            public NameProxy(IState modelElement) : 
                    base(modelElement, "name")
            {
            }
            
            /// <summary>
            /// Gets or sets the value of this expression
            /// </summary>
            public override string Value
            {
                get
                {
                    return this.ModelElement.Name;
                }
                set
                {
                    this.ModelElement.Name = value;
                }
            }
        }
        
        /// <summary>
        /// Represents a proxy to represent an incremental access to the isFinalState property
        /// </summary>
        private sealed class IsFinalStateProxy : ModelPropertyChange<IState, bool>
        {
            
            /// <summary>
            /// Creates a new observable property access proxy
            /// </summary>
            /// <param name="modelElement">The model instance element for which to create the property access proxy</param>
            public IsFinalStateProxy(IState modelElement) : 
                    base(modelElement, "isFinalState")
            {
            }
            
            /// <summary>
            /// Gets or sets the value of this expression
            /// </summary>
            public override bool Value
            {
                get
                {
                    return this.ModelElement.IsFinalState;
                }
                set
                {
                    this.ModelElement.IsFinalState = value;
                }
            }
        }
    }
}


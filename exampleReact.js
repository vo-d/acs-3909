import React from "react";
import PropTypes from 'prop-types';

// Create a Simple JSX Element
const a = (<h1>Hello JSX!</h1> );

// Create a Complex JSX Element
const b = (<div>
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
{/* sdasdasdasd */}
</div>)

// Render 
ReactDOM.render(a, document.getElementById('targetNode'))

// Define an HTML Class in JSX
const JSX = (
    <div className="myDiv">
      <h1>Add a class to this div</h1>
    </div>
  ); 

//Learn About Self-Closing JSX Tags
<br />

//Create a Stateless Functional Component
const myFunction = function() {
    // Change code below this line
    return (<div>afasfsdf</div>)
    // Change code above this line
}

//Create a React Class using function 
class MyComponent extends React.Component{
    constructor(props){
        super(props);
    }
    return(){
        <myFunction />
    }
}

//Create a React Class using function accepting variable
const CurrentDate = (props) => {
    return (
      <div>
        { /* Change code below this line */ }
        <p>The current date is: {props.date}</p>
        { /* Change code above this line */ }
      </div>
    );
  };
  
class Calendar extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <h3>What date is it?</h3>
          { /* Change code below this line */ }
          <CurrentDate date = {Date()}/>
          { /* Change code above this line */ }
        </div>
      );
    }
};

//Create a React Class using function accepting list
const List = (props) => {
    { /* Change code below this line */ }
    return <p>{props.tasks.join(', ')}</p>
    { /* Change code above this line */ }
  };
  
class ToDo extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <h1>To Do Lists</h1>
          <h2>Today</h2>
          { /* Change code below this line */ }
          <List tasks  = {["cook", "eat"]}/>
          <h2>Tomorrow</h2>
          <List tasks  = {["cook", "eat", "sleep"]}/>
          { /* Change code above this line */ }
        </div>
      );
    }
};


//Defaut Props
/*
React also has an option to set default props. 
You can assign default props to a component as a property on the component itself and React assigns the default prop if necessary. 
This allows you to specify what a prop value should be if no value is explicitly provided
*/ 
const ShoppingCart = (props) => {
    return (
        <div>
        <h1>Shopping Cart {props.items}</h1>
        </div>
    )
};
    // Change code below this line
ShoppingCart.defaultProps = {items: 0}

//override Default Props
class ShoppingCart1 extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      { /* Change code below this line */ }
      return <ShoppingCart items = {100}/>
      { /* Change code above this line */ }
    }
};

//propTypes
// React provides useful type-checking features to verify that components receive props of the correct type
ShoppingCart.propTypes ={
    items: PropTypes.number.isRequired
}

//Access Props Using this.props
class App extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
          <div>
              { /* Change code below this line */ }
              <Welcome name ={"Dai"}/>
              { /* Change code above this line */ }
          </div>
      );
    }
};
  
class Welcome extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
          <div>
            { /* Change code below this line */ }
            <p>Hello, <strong>{this.props.name}</strong>!</p>
            { /* Change code above this line */ }
          </div>
      );
    }
};


//Create a Stateful Component
class StatefulComponent extends React.Component {
    constructor(props) {
      super(props);
      // Only change code below this line
      this.state = {
        firstName: "dai"
      }
      // Only change code above this line
    }
    render() {
      return (
        <div>
          <h1>{this.state.firstName}</h1>
        </div>
      );
    }
  };

  /*There is another way to access state in a component. 
  In the render() method, before the return statement, you can write JavaScript directly. 
  For example, you could declare functions, access data from state or props, perform computations on this data, and so on. 
  Then, you can assign any data to variables, which you have access to in the return statement. */

class StatefulComponent extends React.Component {
    constructor(props) {
      super(props);
      // Only change code below this line
      this.state = {
        firstName: "dai"
      }
      // Only change code above this line
    }
    render() {
    const firstName = this.state.firstName;
    return (
        <div>
          <h1>{firstName}</h1>
        </div>
      );
    }
  };


//Set State with this.setState
class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'Initial State'
      };
      // You also need to bind every method to this class
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      // Change code below this line
      this.setState({name: "React Rocks!"})
      // Change code above this line
    }
    render() {
      return (
        <div>
          <button onClick={this.handleClick}>Click Me</button>
          <h1>{this.state.name}</h1>
        </div>
      );
    }
  };

/*Sometimes you might need to know the previous state when updating the state. 
However, state updates may be asynchronous - this means React may batch multiple setState() calls into a single update. 
This means you can't rely on the previous value of this.state or this.props when calculating the next value. 
So, you should not use code like this: */
this.setState({
  counter: this.state.counter + this.props.increment
});
/* Instead, you should pass setState a function that allows you to access state and props. 
Using a function with setState guarantees you are working with the most current values of state and props. 
This means that the above should be rewritten as: */
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

//Example of good setState
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    // Change code below this line
this.toggleVisibility = this.toggleVisibility.bind(this)
    // Change code above this line
  }
  // Change code below this line
toggleVisibility(){
  this.setState((state)=>{
    if(state.visibility){
      state.visibility = false;
    }
    else{
      state.visibility = true
    }
  })
}
  // Change code above this line
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
}


// Create a Controlled Input
// We will use input onChange for this
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    // Change code below this line
this.handleChange = this.handleChange.bind(this);
    // Change code above this line
  }
  // Change code below this line
handleChange(event){
  this.setState({
    input : event.target.value
  })
}
  // Change code above this line
  render() {
    return (
      <div>
        { /* Change code below this line */}
<input value={this.state.input} onChange={this.handleChange} />
        { /* Change code above this line */}
        <h4>Controlled Input:</h4>
        <p>{this.state.input}</p>
      </div>
    );
  }
};


//Create a Controlled Form
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    // Change code below this line
    event.preventDefault();
    this.setState({
  submit : this.state.input
})
    // Change code above this line
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* Change code below this line */}
          <input value={this.state.input} onChange={this.handleChange} />
          {/* Change code above this line */}
          <button type='submit'>Submit!</button>
        </form>
        {/* Change code below this line */}
        <h1>{this.state.submit}</h1>
        {/* Change code above this line */}
      </div>
    );
  }
}


//Pass State as Props to Child Components
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         {/* Change code below this line */}
         <Navbar name = {this.state.name}/>
         {/* Change code above this line */}
       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      {/* Change code below this line */}
      <h1>Hello, my name is: {this.props.name}</h1>
      {/* Change code above this line */}
    </div>
    );
  }
};



//Pass a Callback as Props
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  render() {
    return (
       <div>
         <GetInput
           input={this.state.inputValue}
           handleChange={this.handleChange}/>
         <RenderInput
           input={this.state.inputValue}/>
       </div>
    );
  }
};

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};



//Use the Lifecycle Method 

/* React components have several special methods that provide opportunities to perform actions at specific points in the lifecycle of a component.
These are called lifecycle methods, or lifecycle hooks, and allow you to catch components at certain points in time. 
This can be before they are rendered, before they update, before they receive props, before they unmount, and so on. 
Here is a list of some of the main lifecycle methods: 

componentWillMount() componentDidMount() shouldComponentUpdate() componentDidUpdate() componentWillUnmount() 

The next several lessons will cover some of the basic use cases for these lifecycle methods. */

// This will console log aaaaa before rendering div
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // Change code below this line
console.log("aaaaa")
    // Change code above this line
  }
  render() {
    return <div />
  }
};


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

// This will console log aaaaa before rendering div thanks for componentWillMount()
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


// This will set state activeUsers to 1273 after 2.5 seconds of rendering thanks for componentDidMount()
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        activeUsers: 1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        {/* Change code below this line */}
        <h1>Active Users: {this.state.activeUsers}</h1>
        {/* Change code above this line */}
      </div>
    );
  }
}


//Add Event Listeners
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  // Change code below this line
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }
  // Change code above this line
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};


// shouldComponentUpdate()
/* This method is a useful way to optimize performance. 
For example, the default behavior is that your component re-renders when it receives new props or state, even if they haven't changed. 
You can use shouldComponentUpdate() to prevent this by comparing the props or state */
// This code will only render value when it's even
class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    // Change code below this line
    if(nextProps.value % 2 === 0) return true;
    return false;
    // Change code above this line
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>;
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value} />
      </div>
    );
  }
}


//Styling CSS
class Colorful extends React.Component {
  render() {
    return (
      <div style={{color:"red", fontSize:72}}>Big Red</div>
    );
  }
}; 


//Put style in object, then put object in style attribute of div
const styles = {color: "purple", fontSize: 40, border: "2px solid purple"}
// Change code above this line
class Colorful extends React.Component {
  render() {
    // Change code below this line
    return (
      <div style={styles}>Style Me!</div>
    );
    // Change code above this line
  }
};



//Use Advanced JavaScript in React Render Method
/* You can also write JavaScript directly in your render methods, before the return statement, without inserting it inside of curly braces. 
This is because it is not yet within the JSX code. 
When you want to use a variable later in the JSX code inside the return statement, you place the variable name inside curly braces. */
const inputStyle = {
  width: 235,
  margin: 5
};

class MagicEightBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      randomIndex: ''
    };
    this.ask = this.ask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  ask() {
    if (this.state.userInput) {
      this.setState({
        randomIndex: Math.floor(Math.random() * 20),
        userInput: ''
      });
    }
  }
  handleChange(event) {
    this.setState({
      userInput: event.target.value
    });
  }
  render() {
    const possibleAnswers = [
      'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes, definitely',
      'You may rely on it',
      'As I see it, yes',
      'Outlook good',
      'Yes',
      'Signs point to yes',
      'Reply hazy try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      "Don't count on it",
      'My reply is no',
      'My sources say no',
      'Most likely',
      'Outlook not so good',
      'Very doubtful'
    ];
    const answer = possibleAnswers[this.state.randomIndex]; // Change this line
    return (
      <div>
        <input
          type='text'
          value={this.state.userInput}
          onChange={this.handleChange}
          style={inputStyle}
        />
        <br />
        <button onClick={this.ask}>Ask the Magic Eight Ball!</button>
        <br />
        <h3>Answer:</h3>
        <p>
          {/* Change code below this line */}
          {answer}
          {/* Change code above this line */}
        </p>
      </div>
    );
  }
}


//Render with an If-Else Condition
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState((state) => ({
      // Negate existing boolean
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    if(this.state.display === true){
      return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <h1>Displayed!</h1>
       </div>
      );
    }
    else{
      return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>

       </div>
    );
    }
    
  }
};


//Use && for a More Concise Conditional
/* If you write a lot of else if statements to return slightly different UIs, you may repeat code which leaves room for error. 
Instead, you can use the && logical operator to perform conditional logic in a more concise way.

{condition && <p>markup</p>}

If the condition is true, the markup will be returned.
If the condition is false, the operation will immediately return false after evaluating the condition and return nothing. */
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState(state => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         {this.state.display ===true && <h1>Displayed!</h1>}
       </div>
    );
  }
};


//Use a Ternary Expression for Conditional Rendering

//condition ? expressionIfTrue : expressionIfFalse;
const Style = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line
this.state = {
  input: '',
  userAge:''
}
    // Change code above this line
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={Style}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {/* Change code below this line */}
        {this.state.userAge === ''? 
        buttonOne : this.state.userAge >= 18? 
        buttonTwo : buttonThree}
        {/* Change code above this line */}
      </div>
    );
  }
}


//Render Conditionally from Props
class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    {/* Change code below this line */}
    const youwin = <h1>You Win!</h1>;
    const youlose = <h1>You Lose!</h1>;
    return this.props.fiftyFifty? youwin : youlose
    {/* Change code above this line */}
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      counter: this.state.counter + 1
      
    });
  }
  render() {
    const expression = Math.random() >= .5; // Change this line
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        {/* Change code below this line */}
<Results fiftyFifty = {expression} />
        {/* Change code above this line */}
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}


//Change Inline CSS Conditionally Based on Component State
// Change CSS if input is more than 15 character
class GateKeeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let inputStyle = {
      border: '1px solid black'
    };
    // Change code below this line
if (this.state.input.length > 15){
  inputStyle ={
    border: '3px solid red'
  }
}
    // Change code above this line
    return (
      <div>
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};
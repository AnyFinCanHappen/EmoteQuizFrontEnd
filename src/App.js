import React, { Component } from 'react';
import {Route , Switch} from 'react-router-dom';
import Quiz from './Quiz';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{

  state = {
    complete:false,
    correctAnswers:0
  }

  setComplete = (totalCorrect) =>{
    this.setState({
      complete: true,
      correctAnswers: totalCorrect
    });
  }
  render()
  {
    return(
      <div className = "text-center">
        <Switch>
          <Route path = "/quiz" render = {props => <Quiz setComplete = {this.setComplete} {...props}/>}/>
          <Route path = "/" render = {props => <Home complete = {this.state.complete} correctAnswers = {this.state.correctAnswers} {...props}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;

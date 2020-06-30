import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component{
    constructor(props){
        super(props);
        this.state.complete = this.props.complete;
        this.state.correctAnswers = this.props.correctAnswers;
    }
    state = {}

    goToQuiz = () =>{
        this.setState({state:false})
        this.props.history.push({
            pathname:'quiz'
        });
    }
    render(){
        const {complete, correctAnswers} = this.state;
        if(complete){
            return(
                <div>
                    <p>You have Scored {correctAnswers} out of 10</p>
                    <button onClick = {this.goToQuiz}>Take Quiz Again</button>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Link to= "/quiz">Start Quiz</Link>
                </div>
            );
        }
    }
}
export default Home
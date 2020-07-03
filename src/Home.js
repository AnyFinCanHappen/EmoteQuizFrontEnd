import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col} from 'react-bootstrap';
import "./css/style.css"


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
                    <Container>
                        <Row className = "home align-items-center">
                            <Col>
                                <p>You have Scored {correctAnswers} out of 10</p>
                                <button onClick = {this.goToQuiz}>Take Quiz Again</button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Container>
                        <Row className = "home align-items-center">
                            <Col>
                                <p>Twitch Emote Quiz</p>
                                <p>Test your knowledge of Twitch Emotes</p>
                                <Link to= "/quiz">Start Quiz</Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}

export default Home
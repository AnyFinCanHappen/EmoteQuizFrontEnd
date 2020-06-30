import React, {Component} from 'react';
import Prepare from './util/prepare';
import Config from './util/config.json';

const {imgURL,imgVersion} = Config;


class Quiz extends Component{
    state={
        emotes:null,
        input:"",
        correctAnswers:0,
        currentEmote:8,
    };
    
    componentDidMount(){
        this.initEmote();
    }

    initEmote (){
        const acceptCode = 210;
        Prepare.sendPrepareEP()
        .then(response =>{
            if(response.data.resultCode === acceptCode){
                let emotesList = [];
                response.data.emotes.forEach(element => {
                    let emote = {
                        id:element.id,
                        code:element.code,
                        type:element.type
                    };
                    emotesList.push(emote);
                });
                this.setState({
                   emotes:emotesList
                });
            }
        })
        .catch(error => {
                console.log(error)
            }
        );
    }

    displayImage = () => {
        const {emotes, currentEmote} = this.state;
        return(
            <img src = {imgURL  +  emotes[currentEmote].id + "/" + imgVersion} id = {currentEmote} alt = "Error Loading"/>
        );
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {emotes,input,currentEmote} = this.state;
        const answer = String(emotes[currentEmote].code).toLowerCase();
        const lowerInput = input.toLowerCase();
        if(answer === lowerInput){
            this.setState({
                correctAnswers:this.state.correctAnswers+1
            });
            this.updateCurrentEmote();
        }
    }

    handleGiveUp = () =>{
        this.updateCurrentEmote();
    }
    updateField = ({target}) =>{
        const {name,value} = target;
        this.setState({[name]:value});
    }
    
    updateCurrentEmote = () =>{
        const {currentEmote,correctAnswers} =this.state;
        const {setComplete} = this.props;
        if(currentEmote === 9){
            setComplete(correctAnswers);
            this.props.history.push({
                pathname:'/',
                state: {correctAnswers:correctAnswers}
            });
        }
        else{
            this.setState({
                currentEmote:this.state.currentEmote+1
            });           
        }
    }

    render(){
        const {emotes} = this.state;
        if(emotes === null){
            return(
                <div>
                    Loading
                </div>
            );
        }
        else
        {
            const {input} = this.state;
            return (
                <div>
                    <this.displayImage/>
                    <form onSubmit = {this.handleSubmit}>
                        <label>Input your answer</label>
                        <input name = "input" value = {input} onChange = {this.updateField}/>
                    </form>
                    <button onClick = {this.handleGiveUp}>
                        Give Up
                    </button>
                </div>
            );
        }
    }
}

export default Quiz

import React, { Component } from 'react'
import './ChatPage.css'
import io from 'socket.io-client';

const socketURL= 'http://localhost:4000';
const socket = io(socketURL);

export class ChatPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:'',
            messageSent:'',
            messageReceived:[]
             
        }
    }
    componentDidMount(){
        socket.on('test',(response)=>{
            const tempArr = this.state.messageReceived;
            tempArr.push(response);
            this.setState({messageReceived: tempArr});
            console.log(this.state.messageReceived);

        });
       }
    onChangeHandler=(e)=>{
        this.setState({
             messageSent: e.target.value});

    }
    
    onClickHandler=(e)=>{
        e.preventDefault();
        socket.emit('input',{clientMessage:this.state.messageSent})
        console.log(this.state.messageSent);
        this.setState({messageSent: ''})
    }
    render() {
        return (
            <div className="wrapper">
                Name
                <div className="messageWall">
                <div className='messageContainerReceived'>
                <div className='avatarWrapper'></div>
                <div > 
                    {this.state.messageReceived.map((message, index)=> {
                    return <li className='message' key = {index}>{message}</li>
                    })}
                </div>
                </div>
                </div>
                <div calssname="messageBox">
                    <form onSubmit={this.onClickHandler}>
                        <input className="textBox" type="text" value={this.state.messageSent} 
                        onChange={this.onChangeHandler} placeholder="type your message">
                        </input>
                        <input type="submit">
                        </input>
                        
                    </form>
                </div>
                
            </div>
        )
    }
}

export default ChatPage

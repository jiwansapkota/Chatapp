import React, { Component } from 'react'
import './ChatPage.css'
import io from 'socket.io-client';

const socketURL= 'http://localhost:4000';
const socket = io(socketURL);

export class ChatPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            senderName:'',
            ownName:'',
            messageSent:'',
            messageReceived:[]
             
        }
    }
    componentDidMount(){
        socket.on('broadcast',(response)=>{
            const tempArr = this.state.messageReceived;
            tempArr.push(response.message);
            this.setState({senderName:response.name,messageReceived: tempArr});
            console.log(`${this.state.messageReceived} is sent by ${this.state.senderName}`);

        });
       }
    onChangeHandler=(e)=>{
        this.setState({
             messageSent: e.target.value});

    }
    onNameHandler=(e)=>{
        this.setState({
             ownName: e.target.value});

    }
    
    onClickHandler=(e)=>{
        e.preventDefault();
        socket.emit('input',{clientName:this.state.ownName,clientMessage:this.state.messageSent})
        this.setState({messageSent: '',ownName:''})
    }
    render() {
        return (
            <div className="wrapper">
                <input type='text' value={this.state.name} onChange={this.onNameHandler}></input>
                <div className="messageWall">
                <div className='messageContainerReceived'>
    <div className='avatarWrapper'>{this.state.senderName}</div>
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

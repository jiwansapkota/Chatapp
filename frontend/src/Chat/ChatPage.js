import React, { Component } from 'react'
import './ChatPage.css'
import io from 'socket.io-client';

const socketURL= 'http://localhost:4000';
const socket = io(socketURL);

export class ChatPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ownName:'',
            messageSent:'',
            received:[{ senderName:'',
                messageReceived:''
            }]
             
        }
    }
    componentDidMount(){
        socket.on('broadcast',(response)=>{
            const tempArr = this.state.received;
            tempArr.push(response);
            this.setState({received:tempArr});
            console.log(`${this.state.received.messageReceived} is received from ${this.state.received.senderName}`);

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
        socket.emit('input',{clientName:this.state.ownName,clientMessage:this.state.messageSent, dateTime:this.date()})
        this.setState({messageSent: ''})
    }
    render() {
        return (
            <div className="wrapper">
                <input type='text'placeholder='Enter name first' value={this.state.ownName} onChange={this.onNameHandler}></input>
                <div className="messageWall">
                {this.state.received.map((message, index)=> {
                    if(this.state.received.senderName!==''&&this.state.received.messageReceived!==''){
                    if(this.state.ownName!==message.senderName){
                     return(
                                 <li className='messageContainer'>
                                     <div className='corrector'>
                                        <div className='avatarWrapper'>{message.senderName}</div>
                                        <li className='message' key = {index}>{message.messageReceived}</li>
                                </div>
                             </li>               
                )}
                if(this.state.ownName===message.senderName){

                    return(
                        <li className='messageContainer messageContainerSent'>
                            <div className='corrector'>
                      <li className='message sentMessage' key = {index}>{message.messageReceived}</li>
                    <div className='avatarWrapper sentAvatar'>{message.senderName}</div>
                    </div>
                    </li>               
                         )

                }}
                
                
                })}
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

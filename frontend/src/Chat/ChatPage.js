import React, { Component } from 'react'
import './ChatPage.css'

export class ChatPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:'',
            message:[]
             
        }
    }
    onChangeHandler=(e)=>{
        this.setState({
             message: e.target.value});

    }
    
    onClickHandler=(e)=>{
        e.preventDefault();
        console.log(this.state.message);
    }
    render() {
        return (
            <div className="wrapper">
                Name
                <div className="messageWall">

                </div>
                <div calssname="messageBox">
                    <form onSubmit={this.onClickHandler}>
                        <input className="textBox" type="text" value={this.state.message} onChange={this.onChangeHandler} placeholder="type your message">
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

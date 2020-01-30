import React, { Component } from 'react'
import axios from 'axios';

export default class AddRoom extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            roomName:'',
            roomPassword:''
        }
    }
    
    onInputHandler=(e)=>{
        this.setState({roomName:e.target.value});
    }
    onInputPasswordHandler=(e)=>{
        this.setState({roomPassword:e.target.value});
    }
    onSubmitHandler=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:4000',{roomName:this.state.roomName,roomPassword:this.state.roomPassword});
        console.log('room signed in');
    }
    

    render() {
        return (
            <div className="wrapper">
                <form > 
                    <h1 className="heading">Create Room</h1>
                    <input className="textBox" type='text' placeholder="Room Name" value={this.state.roomName} onChange={this.onInputHandler}/>
                    <input className="textBox" type='password' placeholder='Password' value={this.state.password} onChange={this.onInputPasswordHandler}/>
                    <input className="submitButton" type='button' value="Create" onClick={this.onAddHandler} />
                </form>
                
            </div>
        )
    }
}

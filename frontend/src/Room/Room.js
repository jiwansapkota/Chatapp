import React, { Component } from 'react';
import './Room.css';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class Room extends Component {
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
            console.log('room logged in');
        }
        render() {
        return (
            <div className="wrapper">
                <form > 
                    <h1 className="heading">Enter Room</h1>
                    <input className="textBox" type='text' placeholder="Room Name" value={this.state.roomName} onChange={this.onInputHandler}/>
                    <input className="textBox" type='password' placeholder='Password' value={this.state.password} onChange={this.onInputPasswordHandler}/>
                    <input className="submitButton" type='button' value="Enter Room" onClick={this.onSubmitHandler}/>
                    <Link to="/addRoom">
                    <input className="submitButton" type='button' value="Create Room" />
                    </Link>
                </form>
                
            </div>
        )
    }
}


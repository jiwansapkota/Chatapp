import React from 'react';
import './App.css';
import ChatPage from './Chat/ChatPage';
import Room from './Room/Room';
import AddRoom from './Room/AddRoom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      {/* <Route path="/" component={Home}/> */}
      {/* <Route path="/logIn" component={Login}/> */}
      <Route path="/room" component={Room}/>
      <Route path="/addRoom" component={AddRoom}/>
      <Route path="/" component={ChatPage}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login"
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';
import FriendComponent from './components/FriendComponent';
import FriendForm from './components/FriendForm';

function App() {
  const [credentials , setCredentials] = useState({
    username : "",
    password : ""
  });

  return (
    <Router>
    <div className="App">
    <Switch>
         <PrivateRoute exact path='/friends' component={FriendsList}/>
          <Route exact path="/">
            <Login credentials={credentials} setCredentials={setCredentials}/>
          </Route>
          <PrivateRoute exact path='/friend/:id' component={FriendComponent}/>
          <PrivateRoute exact path='/addFriend/' component={FriendForm}/>
    </Switch>
    </div>
    </Router>
  );
}

export default App;

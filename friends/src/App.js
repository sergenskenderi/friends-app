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


function App() {
  const [credentials , setCredentials] = useState({
    username : "",
    password : ""
  });

  return (
    <Router>
    <div className="App">
    <Switch>
         <PrivateRoute exact path='/protected' component={FriendsList}/>
          <Route exact path="/">
            <Login credentials={credentials} setCredentials={setCredentials}/>
          </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;

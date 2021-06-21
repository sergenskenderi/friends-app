import { Route } from "react-router-dom";
import { Redirect } from 'react-router'

const PrivateRoute = ( {component : Component , ...rest}) => {
    const token = window.localStorage.getItem('token');
    return (
        <Route {...rest} render={ props => {
        if(token){
         return <Component {...props} />
        }else{
          return <Redirect  to="/" />
        }
        }} />
    )
}

export default PrivateRoute;
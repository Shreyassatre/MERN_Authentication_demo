import React, {useContext} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
import AuthContext from './context/AuthContext';
import Home from './Home'

function Router() {

    const {loggedIn} = useContext(AuthContext)

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Signin/>
                    </Route>
                    <Route exact path="/signup">
                        <Signup/>
                    </Route>
                
                    <Route exact path="/home">
                        <Home/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router

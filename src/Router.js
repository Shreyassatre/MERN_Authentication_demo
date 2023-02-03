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
                    {
                        loggedIn == false && (
                            <>
                                <Route exact path="/">
                                    <Signin/>
                                </Route>
                                <Route exact path="/signup">
                                    <Signup/>
                                </Route>
                                <Route exact path="/home">
                                    <center><h1>Unauthorized Aceess!</h1></center>
                                </Route>
                            </>
                        )
                    }
                    {
                        loggedIn == true && (
                            <>
                                <Route exact path="/">
                                    <center><h1>Alrady LoggedIn!</h1></center>
                                </Route>
                                <Route exact path="/signup">
                                    <center><h1>Logout to create new account!</h1></center>
                                </Route>
                                <Route exact path="/home">
                                    <Home/>
                                </Route>
                            </>
                        )
                    }
                    
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router

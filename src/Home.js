import React, {useContext} from 'react'
import AuthContext from './context/AuthContext';
import LogOut from './LogOut'
import './NavBar.css'


function Home() {

    const {loggedIn} = useContext(AuthContext);

    return (
        <div>
            <center><h1>Home Page</h1></center>
        </div>
    )
}

export default Home

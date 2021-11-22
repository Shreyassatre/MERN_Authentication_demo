import React, {useContext} from 'react'
import AuthContext from './context/AuthContext';
import LogOut from './LogOut'
import './NavBar.css'


function Home() {

    const {loggedIn} = useContext(AuthContext);

    return (
        <div>
            <div className="nav">
                <input type="checkbox" id="nav-check"/>
                <div className="nav-header">
                    <div className="nav-title">
                    AuthSys
                    </div>
                </div>
                <div className="nav-btn">
                    <label for="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                    </label>
                </div>
                
                <div className="nav-links">
                    <a href="#1">Products</a>
                    <a href="#2">Pricing</a>
                    <a href="#3">Request Demo</a>
                    {
                        loggedIn === false && (
                        <>
                            <a className="log_out_btn"><LogOut/></a>
                        </>
                    )}
                </div>
            </div>
            <center><h1>Home Page</h1></center>
        </div>
    )
}

export default Home

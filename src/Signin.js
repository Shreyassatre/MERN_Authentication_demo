import React, {useState, useContext} from 'react'
import axios from 'axios';
import './NavBar.css'
import AuthContext from './context/AuthContext';
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'

function Signin() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    //function for toast message
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    var err_count = 0;

    function login(e) {
        e.preventDefault();


        if(password === undefined)
        {
            setPasswordError("Enter Password !");
            err_count += 1;
            Toast.fire({
                icon: 'error',
                title: 'Enter Password !'
              })
        }
        else {
            setPasswordError(undefined);
        }


        if(email === undefined)
        {
            setEmailError("Enter your Email address !");
            err_count += 1;
            Toast.fire({
                icon: 'error',
                title: 'Enter Email id!'
              })
        }
        else{
            setEmailError(undefined);
        }

        
        if(err_count === 0)
        {
            render_data();
        }
    }

    async function render_data(){
        try {
            const loginData = {
                email, password
            };

            await axios.post("http://localhost:5000/auth/login", loginData); 
            await getLoggedIn();
           
            history.push("/home")

            Swal.fire({
                icon: 'success',
                title: 'Welcome !',
                text: 'Successfully Logged in',
                })

        } catch (err) {

            setEmailError("Incorrect Email or Password !")
            Toast.fire({
                icon: 'error',
                title: 'Incorrect Email or Password !'
              })
        
            console.error(err);
        }
    }

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
                    <a href="#3" className="active">Request Demo</a>
                </div>
            </div>

            <form onSubmit={login}>
                <div className="login-block">
                    <h1>Welcome Back</h1>
                    <small>Signin to explore more</small>
                    <input type="text" placeholder="Enter a valid email address"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <small><b className="warning">{emailError}</b></small>
                    <input type="password" placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <small><b className="warning">{passwordError}</b></small>
                    <a href="#forgotPassword" className="forgot_pass"><small>Forgot Password?</small></a>
                    <button type="submit">Sign In</button>
                    <p>Do not have an account? <span><a href="/signup">Signup</a></span></p>
                </div>
            </form>

        </div>
    )
}

export default Signin

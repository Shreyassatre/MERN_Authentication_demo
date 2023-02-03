import React, {useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

function Signup() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordVarify, setPasswordVarify] = useState();
    const [name, setName] = useState();
    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [passwordVarifyError, setPasswordVarifyError] = useState();

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

    function isName(nameValue){
        return /^[a-zA-Z ]{2,}$/.test(name);
    }

    function isEmail(emailValue){
        return /^[A-Za-z_.0-9]{3,}@+[a-z.]{4,7}[.]{1}[comin]{2,3}$/.test(email);
    }

    function isPass(pass){
        return /^[\w!@#$%^&*]{8,}$/.test(pass);
    }

    function isStrongestPass(pass){
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(pass);
    }
    
    function register(e){
        e.preventDefault();

        if(!isPass(password)) {
            setPasswordVarify(undefined);
            err_count += 1;
        }
        else if(!isStrongestPass(password)){
            setPasswordVarify(undefined);
            err_count += 1;
        }
        else if(passwordVarify === undefined)
        {
            setPasswordVarifyError("Confirm your password !")
            err_count += 1;       
            Toast.fire({
                icon: 'error',
                title: 'Confirm your password !'
              })     
        }
        else if(password !== passwordVarify)
        {
            setPasswordVarifyError("Passwords does not match !")
            err_count += 1;  
            Toast.fire({
                icon: 'error',
                title: 'Both Passwords does not match !'
              })          
        }
        else
        {
            setPasswordVarifyError(undefined);
        }


        if(password === undefined)
        {
            setPasswordError("Enter Password !");
            err_count += 1;
            Toast.fire({
                icon: 'error',
                title: 'Set password !'
              })
        }
        else if (!isPass(password)) 
        {
            setPasswordError('Use 8 or more Characters. !');
            err_count += 1;    
            Toast.fire({
                icon: 'error',
                title: 'Password shold be more than 8 characters !'
              })        
        }
        else if(!isStrongestPass(password))
        {
            setPasswordError("Use at least 1 number & 1 symbol. !")
            err_count += 1;         
            Toast.fire({
                icon: 'error',
                title: 'Set strong password !'
              })   
        }
        else{
            setPasswordError(undefined);
        }


        if(email === undefined)
        {
            setEmailError("Enter Your Mail address !");
            err_count += 1;
            Toast.fire({
                icon: 'error',
                title: 'Enter Your Email id !'
              })
        }
        else if(!isEmail(email))
        {
            setEmailError("Invalid Email address !")
            err_count += 1;
            Toast.fire({
                icon: 'error',
                title: 'Invalid Email id !'
              })
        }
        else{
            setEmailError(undefined);
        }


        if(name === undefined) {
            setNameError("Enter Your Name !");
            err_count += 1;
            Toast.fire({
                icon: 'error',
                title: 'Enter Your Name !'
              })
        }
        else if(!isName(name)){
            setNameError("Invalid Name !");
            err_count += 1;  
            Toast.fire({
                icon: 'error',
                title: 'Invalid Name !'
              })
        }
        else {
            setNameError(undefined)
        }
        

        if(err_count === 0)
        {
            save_data();
            setTimeout(
                function() {
                    document.location.href="/"
                },
                3000
            );
            
            Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Your Account is successfully created',
            })
        }
    }

    async function save_data(e){
        try{
            const registerData = {
                name,
                email, 
                password, 
                passwordVarify
            };

            await axios.post("http://localhost:5000/auth/", registerData);

        } catch(err) {
            console.error(err);
            Swal.fire({
            icon: 'error',
            title: 'This account alrady exixts'
            })

            setTimeout(
                function() {
                    document.location.href="/signup"
                },
                2000
            );
        }
    }

    return (
        <div>
            <form onSubmit={register}>
                <div className="login-block">
                    <h1  style={{marginBottom : "20px"}}>Sign Up</h1>
                    <input type="text" placeholder="Enter Your Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <small><b className="warning">{nameError}</b></small>

                    <input className="input" type="text" placeholder="Enter a valid email address"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <small><b className="warning">{emailError}</b></small>

                    <input className="input" type="password" placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <small><b className="warning">{passwordError}</b></small>
                    
                    <input className="input" type="password" placeholder="Enter password"
                        onChange={(e) => setPasswordVarify(e.target.value)}
                        value={passwordVarify}
                    />
                    <small><b className="warning">{passwordVarifyError}</b></small>
                    <button>Sign Up</button>
                    <p>Alrady have an account? <span><a href="/">Signin</a></span></p>
                </div>
            </form>

        </div>
    )
}

export default Signup

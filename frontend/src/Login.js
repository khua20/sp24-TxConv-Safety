import React from 'react';
import './App.css'; 

function Login() {
    return (
        <div>
            <h2>Login / Signup</h2>
            <div class="loginForm">
                <form>
                    <label for="username">Username: </label>
                    <input type="text" id="username" name="username"></input><br></br>
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password"></input><br></br>
                    <input type="submit" value="Login"></input>
                </form>
            </div>
        </div>
    );
    }

export default Login;
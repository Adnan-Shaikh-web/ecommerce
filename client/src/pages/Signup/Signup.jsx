import React, { useState } from 'react'
import './Signup.css'
import postRequest from '../../services/postRequest'

const Signup = () => {

    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [resp, setResp] = useState(false);
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    const errorDiv = document.getElementsByClassName('alert')[0]
    const messageDiv = document.getElementsByClassName('message')[0]

    const SignUpUser = async (e) => {
        setResp(true);
        e.preventDefault();
        const response = await postRequest(user);
        if (response?.error) {
            setError(response.error);
            errorDiv.style.display = 'block'
            messageDiv.style.display = 'none'

        }
        if (response?.message) {
            setMessage(response.message);
            messageDiv.style.display = 'block'
            errorDiv.style.display = 'none'
        }
        setResp(false)
        console.log(response)
    }
    return (
        <div className='Signup'>
            <button className="login-btn">Login</button>
            <div className="container">
                <h3>Sign Up</h3>
                <form onSubmit={SignUpUser}>
                    <input type="text" placeholder='Please enter your name' value={user.name} onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                    }} />
                    <input type="email" placeholder='Please enter your email' value={user.email} onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }} />
                    <input type="password" placeholder='Please enter your password' value={user.password} onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }} />
                    <button className='submit-button' onClick={SignUpUser}>{resp ? "Submitting" : "Submit"}</button>
                </form>
                <div className="alert">{error ? error : ""}</div>
                <div className="message">{message ? message : ""}</div>
            </div>
        </div>
    )
}

export default Signup

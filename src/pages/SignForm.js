import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
// import "./login.css"
import axios from "axios";

const SignForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login data to the server here
    const body = {
      Email: email,
      typedPassword: password
    }
    await axios.post("https://frantic-foal-uniform.cyclic.app/signup/logindetails/", body)
      .then((response) => {
        console.log(response.data.message);
        alert('login succesfull')
        localStorage.setItem('userEmail', JSON.stringify(email));
        navigate('/Todo');

      })
      .catch((error) => {
        console.log(error);
        alert('login failed')
      });
    // console.log("Email:", email);
    // console.log("Password:", password);
    // Redirect to home page after successful login
  };

  return (
    <center className="center" >
      <div className="login" >
        <div className="card" style={{ textAlign: 'center', fontSize: '20px' }}>
          <h1>Login Form</h1>
          <p>Please enter your details</p>
          <form style={{ textAlign: 'center', fontSize: '30px' }}>
            <div>
              <label>Email</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                style={{ width: '200px', height: '40px', fontSize: '20px' }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> &nbsp;
            <div>
              <label>Password</label> &nbsp;
              <input
                style={{ width: '200px', height: '40px', fontSize: '20px' }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> <br />
            <div style={{ textAlign: 'center' }}>
              <button style={{ backgroundColor: "blue", color: 'white', fontSize: '30px', borderRadius: '10px' }} onClick={(e) => handleSubmit(e)}>Login</button>
            </div>
            <p className="text-center">Don't have an account? <Link to="/Signinform" style={{ color: 'black' }}><b>Signup</b></Link></p>
          </form>
        </div>
      </div>
    </center>
  );
};

export default SignForm;
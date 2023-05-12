import React, { useState } from "react";
// import './signup.css';
import { useNavigate, Link } from 'react-router-dom';
import SignForm from "./SignForm";
import axios from "axios";

const Signinform = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      Username: username,
      Email: email,
      Password: password,
      Confirmpassword: confirmPassword
    }
    await axios.post('https://frantic-foal-uniform.cyclic.app/signup/signup/', body)
      .then((response) => {
        console.log(response.data);
        alert('signup succesfull')
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        navigate('/SignForm');
      })
      .catch((error) => {
        console.log(error);
        alert('signup failed')
      });
  };
  return (
    <>
      <center className="center">
        <div className="signup">
          <div className="card" style={{  fontSize: '20px' }}>
            <h1>Registration Form</h1>
            <form style={{ textAlign: 'right', fontSize: '30px', color:'white', }}>
              <div>
                <label><b>User Name</b></label> &nbsp;
                <input style={{ width: '200px', height: '35px', fontSize: '20px' }} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div> &nbsp;
              <div>
                <label><b>Email</b></label> &nbsp;
                <input style={{ width: '200px', height: '35px', fontSize: '20px' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div> &nbsp;
              <div>
                <label><b>Password</b></label>  &nbsp;
                <input style={{ width: '200px', height: '35px', fontSize: '20px' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div> &nbsp;
              <div>
                <label><b>Confirm Password</b></label>  &nbsp;
                <input style={{ width: '200px', height: '35px', fontSize: '20px' }} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div> &nbsp;
              <div style={{ textAlign: 'center' }}>
                <button style={{ backgroundColor: "blue", fontSize: '30px', borderRadius: '10px', color: 'white' }} onClick={(e) => handleSubmit(e)}>Signup</button>
              </div>
              <p className="text-center" style={{color:'white'}}><b>Have already an account</b> <Link to="/SignForm" style={{ color: 'black' }}><b>SignForm</b></Link></p>
            </form>
          </div>
        </div>
      </center>
    </>

  );
}

export default Signinform;
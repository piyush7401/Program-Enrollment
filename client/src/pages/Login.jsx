import { Link ,useNavigate} from 'react-router-dom';
import React, { useState,useContext } from 'react'
import InputForm from '../components/share/InputForm';
import UserContext from '../context/UserContext';
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(UserContext);

  const handlesubmit = async(e) => {
    e.preventDefault();
    console.log( email, password );
    try {
      setUser({email,password});
      const {data} = await axios.post('/auth/login',{email,password});
      if (data.success) {
        alert("Login Successfully ");
        navigate("/DashBoard");
      }
    } catch {
      alert("invalid data");
      console.log(e.error);
    }
  };

  const handlePasswordchange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailchange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="form-container">
        <form className="p-5" onSubmit={handlesubmit}>
          <div className="mb-3">
            <h1>Login is Required!!</h1>
          </div>
          <h5>
          <InputForm
            htmlFor="email"
            labelText="Email"
            type="email"
            name="email"
            value={email}
            handleChange={handleEmailchange}
          ></InputForm>
          <InputForm
            htmlFor="password"
            labelText="Password"
            type="password"
            name="password"
            value={password}
            handleChange={handlePasswordchange}
          ></InputForm>
          <div className="d-flex justify-content-between">
            <p>
              Not Registered!! <Link to="/register">Register</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          </h5>
        </form>
      </div>
    </>
  )
}

export default Login;
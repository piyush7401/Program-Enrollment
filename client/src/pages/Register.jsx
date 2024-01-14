import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import InputForm from "../components/share/InputForm";
// import UserContext from "../context/UserContext";
import axios from "axios";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const {setUser} = useContext(UserContext);  

  const handlesubmit = async(e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      const {data} = await axios.post('http://localhost:8000/auth/register',{name,email,password});
      if (data.success) {
        alert("Register Successfully ");
        navigate("/");
      }
    } catch {
      alert("invalid data");
      console.log(e.error);
    }
  };

  const handleNamechange = (e) => {
    setName(e.target.value);
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
            <h1>Registration is Required!!</h1>
          </div>
          <h5>
            <InputForm
              htmlFor="name"
              labelText="Name"
              type="text"
              name="name"
              value={name}
              handleChange={handleNamechange}
            ></InputForm>
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
          </h5>
          <h5>
            <div className="d-flex justify-content-between">
              <p>
                Already Registered!! <Link to="/">Login</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </h5>
        </form>
      </div>
    </>
  );
};

export default Register;
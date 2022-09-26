import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

//toastify settings
const toastifyOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, email, password, confirmpassword } = values;

    if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters",
        toastifyOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email field can not be blank", toastifyOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Please enter a strong password, password length should be greater than 8 characters",
        toastifyOptions
      );
      return false;
    } else if (password !== confirmpassword) {
      toast.error("password and confirm password don't match", toastifyOptions);
      return false;
    }
    return true;
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastifyOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setavatar");
      }
    }
  };

  //use effect hook
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(e) => HandleSubmit(e)} id="form">
          <div className="brand">
            <img src={Logo} alt="App-Logo" />
            <h1>Chit-Chat</h1>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password***"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password***"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>
          <span>
            already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      width: 100%;
      color: white;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: 0.4s ease-in-out;
      &:hover {
        background-color: #4e0eff;
        box-shadow: 0 0 10px #4e0eff, 0 0 20px #4e0eff, 0 0 30px #4e0eff;
      }
    }

    span {
    color: white;
    text-transform: uppercase;
    a {
      text-decoration: none;
      font-weight: bold;
      background: linear-gradient(to right , #4e0eff 50%, #997af0 50%);
      background-size: 200% 100%;
      background-position:100% 0;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;

      &:hover {
        background-position: 0 0;
        transition: 1s;
      }
    }
  }
`;

export default Register;

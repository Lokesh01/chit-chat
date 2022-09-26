import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const LogOut = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.2rem;
    color: #ebe7ff;
  }

  &:hover {
    background-color: #4e0eff;
    box-shadow: 0 0 10px #4e0eff, 0 0 20px #4e0eff, 0 0 30px #4e0eff;
    outline: solid white;
  }
`;

export default LogOut;

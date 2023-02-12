import React from 'react'
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs"
import styled from 'styled-components'

const SocialLoginButtons = () => {
  return (
    <Container>
      <button type="button">
        <BsGoogle />
      </button>
      <button type="button">
        <BsFacebook />
      </button>
      <button type="button">
        <BsGithub />
      </button>
    </Container>
  )
}

const Container = styled.div`
display: flex;
width: 100%;
justify-content: center;
gap: 1rem;
background-color: transparent;
button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: solid 0.1rem #4e0eff;
    color: white;
    padding: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: 0.4s ease-in-out;
    &:hover {
      transform: scale(0.8);
      background-color: transparent;
      box-shadow: 0 0 10px #4e0eff, 0 0 20px #4e0eff, 0 0 30px #4e0eff;
    }
}
`

export default SocialLoginButtons

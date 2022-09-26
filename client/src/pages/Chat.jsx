import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  //socket.io config
  const socket = useRef();

  //navigate hook
  const navigate = useNavigate();

  //fetch current user form local storage
  const fetchCurrUser = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true); //user info is loaded
    }
  };

  useEffect(() => {
    fetchCurrUser();
    // console.log(currentUser);
  }, []);

  //socket config
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  //getting all contacts except curr user
  const getContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        };
        const data = await axios.get(
          `${allUsersRoute}/${currentUser._id}`,
          config
        );
        setContacts(data.data);
      } else {
        navigate("/setavatar");
      }
    }
  };

  useEffect(() => {
    getContacts();
  }, [currentUser]);

  //handling selected chat
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 15% 55%;
    }
  }
`;

export default Chat;

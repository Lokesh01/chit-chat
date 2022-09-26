import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import LogOut from "./LogOut";
import Messages from "./Messages";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  //fetch all chats
  const fetchChats = async () => {
    if (currentChat) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const response = await axios.post(
        recieveMessageRoute,
        {
          sender: currentUser._id,
          receiver: currentChat._id,
        },
        config
      );
      setMessages(response.data);
    }
  };

  //will call fetch chats everytime chat is changed
  useEffect(() => {
    fetchChats();
  }, [currentChat, messages]);

  const handleSendMessage = async (message) => {
    // console.log(`${currentChat._id} and ${currentUser._id}`);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    await axios.post(
      sendMessageRoute,
      {
        sender: currentUser._id,
        receiver: currentChat._id,
        message,
      },
      config
    );

    socket.current.emit("send-msg", {
      sender: currentUser._id,
      receiver: currentChat._id,
      message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  //scroll bar settings
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>

            <LogOut />
          </div>

          <div className="chat-messages">
            {messages?.map((msg) => (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${msg.fromSelf ? "sended" : "received"}`}
                >
                  <div className="content">
                    <p>{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        color: white;
      }
    }
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    overflow: auto;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f0fff21;
      }
    }

    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;

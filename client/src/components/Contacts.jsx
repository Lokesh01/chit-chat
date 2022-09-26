import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

const Contacts = ({ contacts ,changeChat}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));

      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    fetchCurrentUser();
  }, []);

  const changeCurrentChat = (idx,contact) => {
    setCurrentSelectedChat(idx);
    changeChat(contact);
  }

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Chit-Chat</h3>
          </div>

          <div className="contacts">
            {contacts.map((contact, idx) => (
              <div
                className={`contact ${
                  idx === currentSelectedChat ? "selected" : ""
                }`}
                key={idx}
                onClick={() => changeCurrentChat(idx,contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="currentUser">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.5rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      display: flex;
      align-items: center;
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      padding: 0.4rem;
      border-radius: 0.2rem;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color: #9186f3;
    }
  }

  .currentUser {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;

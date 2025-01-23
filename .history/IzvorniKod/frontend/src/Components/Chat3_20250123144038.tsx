import React, { useEffect, useState } from "react";
import { over } from "stompjs";
(window as any).global = window;
import "global";
import SockJS from "sockjs-client";
import "../styles/Chat3.css";

let stompClient: any = null;
const apiUrl = import.meta.env.VITE_API_URL; // Ensure the API URL is imported from environment variables

interface ChatMessage {
  senderName: string;
  receiverName?: string;
  message: string;
  status: "JOIN" | "MESSAGE";
}

interface UserData {
  username: string;
  receivername: string;
  connected: boolean;
  message: string;
}

const ChatRoom: React.FC = () => {
  const [privateChats, setPrivateChats] = useState<Map<string, ChatMessage[]>>(
    new Map()
  );
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [tab, setTab] = useState<string>("CHATROOM");
  const [userData, setUserData] = useState<UserData>({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    const Sock = new SockJS(`${apiUrl}/ws`); // Use apiUrl for WebSocket connection
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    const chatMessage: ChatMessage = {
      senderName: userData.username,
      status: "JOIN",
      message: "",
    };
    stompClient.send(`${apiUrl}/app/message`, {}, JSON.stringify(chatMessage)); // Use apiUrl for message endpoint
  };

  const onMessageReceived = (payload: any) => {
    const payloadData: ChatMessage = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.has(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload: any) => {
    const payloadData: ChatMessage = JSON.parse(payload.body);
    if (privateChats.has(payloadData.senderName)) {
      privateChats.get(payloadData.senderName)!.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      const list: ChatMessage[] = [payloadData];
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err: any) => {
    console.error(err);
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      const chatMessage: ChatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send(
        `${apiUrl}/app/message`,
        {},
        JSON.stringify(chatMessage)
      ); // Use apiUrl for message endpoint
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      const chatMessage: ChatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab)?.push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send(
        `${apiUrl}/app/private-message`,
        {},
        JSON.stringify(chatMessage)
      ); // Use apiUrl for private message endpoint
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...(privateChats.get(tab) || [])].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;

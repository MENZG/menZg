import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../styles/Chat.css";

const client = new Client({
  brokerURL: "ws://localhost:5000/chat-websocket", // WebSocket URL
  connectHeaders: {},
  debug: (str) => console.log(str),
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  webSocketFactory: () => new SockJS("http://localhost:5000/chat-websocket"),
});

interface Message {
  username: string;
  text: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    client.onConnect = () => {
      client.subscribe("/topic/messages", (message) => {
        if (message.body) {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        }
      });
    };
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && isUsernameSet) {
      const newMessage = {
        username,
        text: message,
      };
      client.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(newMessage),
      });
      setMessage("");
    }
  };

  const handleSetUsername = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  return (
    <div className="chatContainer">
      {!isUsernameSet ? (
        <div className="usernamePrompt">
          <h2>Enter a Username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            className="input"
          />
          <button onClick={handleSetUsername} className="button">
            Set Username
          </button>
        </div>
      ) : (
        <div className="chatBox">
          <h2>Live Chat</h2>
          <div className="messagesContainer">
            {messages.map((msg, index) => (
              <div key={index} className="messageItem">
                <strong>{msg.username}:</strong> {msg.text}
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            ))}
          </div>
          <div className="inputContainer">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="input"
            />
            <button onClick={sendMessage} className="button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

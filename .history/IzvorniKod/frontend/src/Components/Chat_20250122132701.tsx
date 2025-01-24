// Chat.tsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../styles/Chat.css";

const socket = io("http://localhost:5000"); // Replace with your server URL

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
    socket.on("receive_message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && isUsernameSet) {
      const newMessage = {
        username,
        text: message,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit("send_message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
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

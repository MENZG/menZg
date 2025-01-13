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
    <div className={styles.chatContainer}>
      {!isUsernameSet ? (
        <div className={styles.usernamePrompt}>
          <h2>Enter a Username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
          />
          <button onClick={handleSetUsername} className={styles.button}>
            Set Username
          </button>
        </div>
      ) : (
        <div className={styles.chatBox}>
          <h2>Live Chat</h2>
          <div className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.messageItem}>
                <strong>{msg.username}:</strong> {msg.text}
                <span className={styles.timestamp}>{msg.timestamp}</span>
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className={styles.input}
            />
            <button onClick={sendMessage} className={styles.button}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

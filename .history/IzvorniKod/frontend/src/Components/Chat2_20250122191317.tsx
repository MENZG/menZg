import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import "../styles/Chat.css";

interface Message {
  username: string; // The username of the sender of the message
  text: string; // The content of the message
  timestamp: string; // The time at which the message was sent, in string format
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  let stompClient: Client | null = null;

  useEffect(() => {
    stompClient = new Client({
      brokerURL: "ws://localhost:8080/chat/websocket",
      connectHeaders: {},
      onConnect: () => {
        console.log("Connected");
        stompClient?.subscribe("/topic/messages", (message) => {
          if (message.body) {
            setMessages((prev) => [...prev, JSON.parse(message.body)]);
          }
        });
      },
      onStompError: (error) => {
        console.error("STOMP error:", error);
      },
    });
    stompClient.activate();

    return () => {
      stompClient?.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && isUsernameSet && stompClient?.connected) {
      const newMessage = {
        username,
        text: message,
        timestamp: new Date().toISOString(),
      };
      stompClient.publish({
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
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
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

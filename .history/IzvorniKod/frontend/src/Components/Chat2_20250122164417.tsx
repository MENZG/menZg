import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "../styles/Chat.css";

const WEBSOCKET_URL = "http://localhost:5000/ws"; // Replace with your WebSocket endpoint

interface Message {
  sender: string;
  content: string;
  type: "CHAT" | "JOIN" | "LEAVE";
  timestamp?: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  let stompClient: Stomp.Client | null = null;

  useEffect(() => {
    if (isUsernameSet) {
      const socket = new SockJS(WEBSOCKET_URL);
      stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        stompClient?.subscribe("/topic/public", (payload: any) => {
          const message: Message = JSON.parse(payload.body);
          setMessages((prev) => [...prev, message]);
        });

        // Send JOIN message to the server
        stompClient?.send(
          "/app/chat.addUser",
          {},
          JSON.stringify({ sender: username, type: "JOIN" })
        );
      });

      return () => {
        stompClient?.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      };
    }
  }, [isUsernameSet, username]);

  const sendMessage = () => {
    if (message.trim() && stompClient) {
      const chatMessage: Message = {
        sender: username,
        content: message,
        type: "CHAT",
        timestamp: new Date().toLocaleTimeString(),
      };
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
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
              <div
                key={index}
                className={`messageItem ${msg.type.toLowerCase()}`}
              >
                {msg.type === "CHAT" ? (
                  <>
                    <strong>{msg.sender}:</strong> {msg.content}
                  </>
                ) : (
                  <span>{msg.content}</span>
                )}
                {msg.timestamp && (
                  <span className="timestamp">{msg.timestamp}</span>
                )}
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

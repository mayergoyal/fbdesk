import React from "react";

const ChatWindow = ({ conversation }) => {
  if (!conversation)
    return <p style={{ padding: "2rem" }}>Select a conversation</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h3>{conversation.name}</h3>
      <div className="chat-bubble" style={{ margin: "1rem 0" }}>
        <p>
          <strong>{conversation.name}:</strong> {conversation.message}
        </p>
        <small>Mar 05, 2:22 AM</small>
      </div>

      <div className="chat-reply" style={{ marginTop: "auto" }}>
        <input
          type="text"
          placeholder={`Message ${conversation.name}`}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;

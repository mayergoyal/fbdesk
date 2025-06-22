import React from "react";

const dummyConversations = [
  {
    id: 1,
    name: "Amit RG",
    message: "Is it in stock right now?",
    source: "Facebook DM",
    time: "10m",
  },
  {
    id: 2,
    name: "Hiten Saxena",
    message: "Available in store?",
    source: "Facebook Post",
    time: "10m",
  },
];

const ConversationList = ({ onSelect }) => {
  return (
    <div>
      <h3 style={{ padding: "1rem" }}>Conversations</h3>
      {dummyConversations.map((conv) => (
        <div
          key={conv.id}
          style={{
            padding: "1rem",
            borderBottom: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => onSelect(conv)}
        >
          <strong>{conv.name}</strong>
          <p>{conv.message}</p>
          <small>
            {conv.source} • {conv.time}
          </small>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;

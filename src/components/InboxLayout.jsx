import React, { useState } from "react";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import CustomerDetails from "./CustomerDetails";
import "../styles/Inbox.css"; // create a CSS file later

const InboxLayout = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="inbox-container">
      <ConversationList onSelect={setSelectedConversation} />
      <ChatWindow conversation={selectedConversation} />
      <CustomerDetails conversation={selectedConversation} />
    </div>
  );
};

export default InboxLayout;

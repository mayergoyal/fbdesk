import React from "react";

const CustomerDetails = ({ conversation }) => {
  if (!conversation)
    return <div style={{ padding: "1rem" }}>No customer selected</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h4>{conversation.name}</h4>
      <p>
        Status: <strong>Offline</strong>
      </p>
      <button>📞 Call</button> &nbsp;
      <button>👤 Profile</button>
      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Email:</strong> {conversation.name.toLowerCase()}
          @richpanel.com
        </p>
        <p>
          <strong>First Name:</strong> {conversation.name.split(" ")[0]}
        </p>
        <p>
          <strong>Last Name:</strong> {conversation.name.split(" ")[1]}
        </p>
        <a href="#">View more details</a>
      </div>
    </div>
  );
};

export default CustomerDetails;

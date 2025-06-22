// src/components/FBConnect.jsx
import React, { useState } from "react";

const FBConnect = () => {
  const [pages, setPages] = useState([]);
  const [token, setToken] = useState("");

  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("✅ Logged in:", response);
          fetchPages(response.authResponse.accessToken);
          navigate("/inbox"); // after successful FB page connection
        } else {
          console.log("❌ Login failed");
        }
      },
      {
        scope:
          "pages_messaging,pages_manage_metadata,pages_read_engagement,pages_show_list,public_profile",
      }
    );
  };

  const fetchPages = (userAccessToken) => {
    window.FB.api(
      "/me/accounts",
      "GET",
      { access_token: userAccessToken },
      function (response) {
        console.log("Pages:", response);
        setPages(response.data);
      }
    );
  };

  return (
    <div>
      <h2>Connect Facebook Page</h2>
      <button onClick={handleFBLogin}>Login with Facebook</button>

      {pages.length > 0 && (
        <div>
          <h3>Your Pages</h3>
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                {page.name} -{" "}
                <button
                  onClick={() => {
                    setToken(page.access_token);
                    alert(`Connected to page: ${page.name}`);
                  }}
                >
                  Connect
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FBConnect;

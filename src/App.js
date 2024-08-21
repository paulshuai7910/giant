import React, { useState } from "react";
import Login from "./Login";
import RegisterForm from "./Register";
import "./login.css";

function App() {
  const [pageType, setPageType] = useState("login");
  return (
    <div className="content">
      <h1>Login</h1>
      <div className="login-box">
        {pageType === "login" ? (
          <Login setPageType={setPageType} />
        ) : (
          <RegisterForm setPageType={setPageType} />
        )}
      </div>
    </div>
  );
}

export default App;

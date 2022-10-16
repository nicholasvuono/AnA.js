import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [email = "", setEmail] = useState();
  const [password = "", setPassword] = useState();

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const submitForm = (email, password) => {
    const url = "http://localhost:3001/api/users/login";

    let urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlencoded,
    })
      .then((response) => response.json())
      .then((json) => props.setUser(json));

    setEmail("");
    setPassword("");
  };

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        type="button"
        value="Login"
        onClick={() => {
          submitForm(email, password);
        }}
      >
        <Link to="/">Login</Link>
      </button>
    </form>
  );
}

export default Login;

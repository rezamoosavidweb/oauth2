import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";
import Products from "./components/Products";
import "./App.css";

function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-body">
        <span>
          <LoginButton />
          <LogoutButton />
        </span>
        {isAuthenticated && (
          <div style={{ fontSize: ".8rem" }}>
            <img src={user?.picture} alt={user?.name} />
            <h2>{user?.name}</h2>
            <p>{user.email}</p>
            <JSONPretty data={user} />
            <Products />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

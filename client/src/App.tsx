import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./pages/Login";
import { Container } from "react-bootstrap";
import backgroundImage from "./assets/background.svg";

function App() {
  useEffect(() => {
    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "test", email: "test@gmail.com" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login Response:", data);
        return fetch("http://localhost:8000/api/dogs/breeds", {
          method: "GET",
          credentials: "include",
        });
      })
      .then((res) => res.json())
      .then((anotherData) => {
        console.log("Another Endpoint Data:", anotherData);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <Container
      fluid
      className="vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Login />
    </Container>
  );
}

export default App;

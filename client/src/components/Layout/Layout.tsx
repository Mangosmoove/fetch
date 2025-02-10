import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import backgroundImage from "../../assets/background.svg";

export const Layout = () => {
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
      <Outlet />
    </Container>
  );
};

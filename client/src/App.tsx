import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/overview" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

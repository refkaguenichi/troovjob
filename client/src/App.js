import { Routes, Route } from "react-router-dom";
import "./App.css";
import Appbar from "./components/Appbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <Appbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/api/users/:id" element={<Profile />} />
        <Route path="/api/auth/register" element={<Register />} />
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

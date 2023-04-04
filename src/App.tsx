import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Shows from "./pages/Shows";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout/Layout";
import Profile from "./pages/Profile";
import Resume from "./components/Resume/Resume";
import ContentIntro from "./pages/ContentIntro";
import "./App.scss";
import './variables.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tv-shows" element={<Shows />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutme" element={<Resume />} />
          <Route path="/contents/:id" element={<ContentIntro />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/common/navbarComponent/NavbarComponent";
import FooterComponent from "./components/common/footerComponent/FooterComponent";
import HomePage from "./pages/homePage/HomePage";
import ScrollToTopButton from "./components/common/scrollToTopButton/ScrollToTopButton";
import PostDetail from "./pages/postDetail/PostDetail";

function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<PostDetail />}></Route>
        </Routes>
      </div>
      <FooterComponent />
      <ScrollToTopButton />
    </Router>
  );
}

export default App;

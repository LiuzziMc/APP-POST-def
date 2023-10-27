import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/common/navbarComponent/NavbarComponent";
import FooterComponent from "./components/common/footerComponent/FooterComponent";
import HomePage from "./pages/homePage/HomePage";
import ScrollToTopButton from "./components/common/scrollToTopButton/ScrollToTopButton";
import PostDetail from "./pages/postDetail/PostDetail";
import Favourites from "./pages/favourites/Favourites";
import DraftList from "./pages/drafts/DraftList";
import DraftDetail from './pages/drafts/DraftDetail';


function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drafts" element={<DraftList />} />
          <Route path="/draft/:draftId" element={<DraftDetail />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/post/:postId" element={<PostDetail />}></Route>
        </Routes>
      </div>
      <FooterComponent />
      <ScrollToTopButton />
    </Router>
  );
}

export default App;

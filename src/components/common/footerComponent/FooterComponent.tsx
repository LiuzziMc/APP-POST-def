import React, { useEffect, useState } from "react";
import "./FooterComponent.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";


const Footer = () => {
  const favouritePosts = useSelector((state: RootState) => state.posts.favorites); // Accedi all'array dei preferiti
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    setFavoriteCount(favouritePosts.length); // Otteni la lunghezza dell'array dei preferiti
  }, [favouritePosts]);

  return (
    <div className="footer">
      <div className="footer-icons">
      <Link to="/drafts">
        <i className="bi bi-pencil-square bozze-icon" title="Bozze" />
      </Link>
        <Link to="/">
          <i className="bi bi-house-fill" title="Home"></i>
        </Link>
        <Link to="/favourites">
          <i className="bi bi-heart" title="Preferiti"></i>
          {favoriteCount > 0 && <span className="badge bg-danger position-absolute">{favoriteCount}</span>}
        </Link>
      </div>
    </div>
  );
};

export default Footer;

import React, { useEffect, useState } from "react";
import "./FooterComponent.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Avatar from '../../../assets/images/Avatar.png'
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const Footer = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const favouritePosts = useSelector((state: RootState) => state.posts.favorites); // Accedi all'array dei preferiti

  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    setFavoriteCount(favouritePosts.length); // Otteni la lunghezza dell'array dei preferiti
  }, [favouritePosts]);

  const handleNotificationClick = () => {
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  return (
    <div className="footer">
      <div className="footer-icons">
        <Link to="/profile">
          <i className="bi bi-person" onClick={handleProfileClick}></i>
        </Link>
        <Link to="/">
          <i className="bi bi-house-fill"></i>
        </Link>

        <div className="notification-container" onClick={handleNotificationClick} >
          <i className={`bi bi-bell ${showNotification ? "active" : ""}`}></i>
          {showNotification && (
            <div className="notification">
              <p>Non ci sono notifiche.</p>
            </div>
          )}
        </div>
        <Link to="/favourites">
          <i className="bi bi-heart"></i>
          {favoriteCount > 0 && <span className="badge bg-danger position-absolute">{favoriteCount}</span>}
        </Link>
      </div>

      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header >
          <Modal.Title>Profilo Utente</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <div className="user-info text-center">
            <div className="user-icon">
              <img src={Avatar} alt="Avatar" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
            </div>
            <div>
              <strong>Nome Utente:</strong>  <br />
              <strong>Cognome Utente:</strong>  <br />
              <strong>Email: </strong> utente@example.com <br />
              <strong>Data di Nascita: </strong> 01/01/1990
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <button  className="btn btn-primary" onClick={() => setShowProfileModal(false)} > {" "} Chiudi</button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Footer;

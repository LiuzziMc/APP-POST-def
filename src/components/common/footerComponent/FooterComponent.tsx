import React, { useState } from "react";
import "./FooterComponent.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const Footer = () => {
  // Stato per la visualizzazione della notifica e del modal del profilo utente
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

 //click sul'icona delle notifiche
  const handleNotificationClick = () => {
    setShowNotification(true);

     // Nasconde la notifica dopo un tot
    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
  };

   //click sull'icona del profilo
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
        <div
          className="notification-container"onClick={handleNotificationClick} >
          <i className={`bi bi-bell ${showNotification ? "active" : ""}`}></i>
          {/* Mostra la notifica se necessario */}
          {showNotification && (
            <div className="notification">
              <p>Non ci sono notifiche.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modale del profilo utente */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header >
          <Modal.Title>Profilo Utente</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <div className="user-info text-center">
            <div className="user-icon">
              <i className="bi bi-person" style={{ fontSize: "3em" }}></i>
            </div>
            <div>
              <h4>Nome Utente</h4>
              <p>Cognome Utente</p>
              <p>Email: utente@example.com</p>
              <p>Data di Nascita: 01/01/1990</p>
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

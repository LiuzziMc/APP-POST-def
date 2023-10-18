import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserForPost } from "../../features/users/userSlice";
import { AppDispatch, RootState } from "../../app/store";
import { Post } from "../../interfaces/PostInterfaces";
import { Modal } from "react-bootstrap";
import Avatar from "../../assets/images/Avatar.png";

interface User {
  userId: number;
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
}

interface UserComponentProps {
  userId: number;
}

const UserComponent: React.FC<UserComponentProps> = ({ userId }) => {
  const user = useSelector(
    (state: RootState) => state.users.userData) as User | null;
  const selectedPost = useSelector(
    (state: RootState) => state.posts.openPost ) as Post | null;
  const dispatch: AppDispatch = useDispatch();

   // Stato per gestire la visualizzazione del modale
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // mostrare i dettagli dell'utente
  const handleShowMoreDetails = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

   // caricare i dati utente associati al post selezionato
  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchUserForPost(selectedPost.userId));
    }
  }, [dispatch, selectedPost]);

  if (selectedPost) {
    return (
      <div className="likes-container">
        {/* Contenuto utente */}
        {user ? (
          // Mappa degli utenti
          <div key={user.id} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "10px" }}>
              <img  src={Avatar} alt="Avatar" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
            </div>
            <span onClick={() => handleShowMoreDetails(user)}>
              <strong>{user.name}</strong> ha creato questo post
            </span>
            <i className="bi bi-eye ms-2 eye-icon" onClick={() => handleShowMoreDetails(user)}></i>
          </div>
        ) : (
          <span>
            <strong>Utente sconosciuto</strong> ha creato questo post
          </span>
        )}
        {/* Modale per i dettagli dell'utente */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <img  src={Avatar} alt="Avatar" style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
            <Modal.Title>Dettagli utente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <div>
                {/* Dettagli utente */}
                <p>
                  <strong>Id Utente:</strong> {selectedUser.id}
                </p>
                <p>
                  <strong>Nome:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Indirizzo:</strong> {selectedUser.address.street},{" "}
                  {selectedUser.address.city}
                </p>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  return null;
};

export default UserComponent;

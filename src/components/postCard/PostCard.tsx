import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { openPost, toggleFavorite } from '../../features/posts/postSlice';
import Avatar from '../../assets/images/Avatar.png'
import './PostCard.css';
import { Post } from '../../interfaces/PostInterfaces';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.posts.favorites);
  // Lista di esempio di utenti che hanno messo Mi Piace
  const usersWhoLiked = ["Tizio", "Caio", "Sempronio"];
  // Stato per mostrare/nascondere il messaggio di conferma
  const [confirmationVisible, setConfirmationVisible] = useState(false); 

    // aprire il dettaglio del post
  const handleOpenPost = () => {
    dispatch(openPost(post));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(post.id));
    setConfirmationVisible(true); // Mostra il messaggio di conferma
    setTimeout(() => {
      setConfirmationVisible(false); // Nascondi il messaggio di conferma dopo 1 secondo
    }, 1000);
  };

  const isFavorite = favorites.includes(post.id);

  return (
    <Card className={`card-container h-100 mb-5 ${isFavorite ? 'favorite' : ''}`}>
      <Card.Body className="card-body card-container d-flex flex-column text-center">
        <Card.Header className="card-header">
        <img src={Avatar} alt="Comment Avatar" className="comment-avatar" style={{ width: "30px", height: "30px", borderRadius: "50%" }}/>
          <div className="post-info"> {post.id} </div>
        </Card.Header>
        <Card.Title className="card-title mt-2">{(post.title)}</Card.Title>
        <Card.Text className="card-text flex-grow-1 body mt-4">{(post.body)}</Card.Text>
        <Link to={`/post/${post.id}`} onClick={handleOpenPost} className="btn btn-primary no-hover-effect align-self-center nav-link"> Visualizza</Link>
        <hr />
        {/* Icone */}
        <div className="icons-container">
          <i className={`bi bi-chat comment-icon`} style={{ cursor: 'pointer' }}></i>
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} text-danger favorite-icon`} onClick={handleToggleFavorite}></i>
          <i className="bi bi-share share-icon" style={{ cursor: 'pointer' }}></i>
        </div>
        <br />
        <div className="likes-container">
          <i className="bi bi-person-fill me-2"></i>{usersWhoLiked[0]} e altre {usersWhoLiked.length - 1} persone hanno messo Mi Piace
        </div>
        <br />

        {/* Messaggio di conferma */}
        {confirmationVisible && (
          <span className="confirmation-message text-white">{isFavorite ? 'Aggiunto ai preferiti' : 'Rimosso dai preferiti'}</span>
        )}
      </Card.Body>
    </Card>
  );
}

export default PostCard;

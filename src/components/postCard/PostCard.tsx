import React, { useState } from 'react';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Post } from '../../interfaces/PostInterfaces';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, openPost, toggleFavorite } from '../../features/posts/postSlice';
import './PostCard.css';
import { RootState } from '../../app/store';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
   // Stati per gestire il comportamento del componente
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showCommentConfirmation, setShowCommentConfirmation] = useState(false); 

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.posts.favorites);

   //apertura del post
  const handleOpenPost = () => {
    dispatch(openPost(post));
  };

   //aggiunta/rimozione dai preferiti e mostra la conferma dopo un tot di tempo
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(post.id));
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 1000);
  };

  const isFavorite = favorites.includes(post.id);
  const confirmationText = isFavorite ? 'Aggiunto ai preferiti' : 'Rimosso dai preferiti';

 // visualizzazione del campo di inserimento del commento
  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  //cambiamento nel campo di inserimento commento
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const usersWhoLiked = ["Tizio", "Caio", "Sempronio"]; 

    //l'aggiunta di un commento
  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: uniqueCommentId(),
        text: comment,
      };
      dispatch(addComment({ postId: post.id, comment: newComment }));
      setComment('');


      setShowCommentConfirmation(true);
      setTimeout(() => {
        setShowCommentConfirmation(false);
      }, 1000);
    }
  };

  return (
    <Card className={`card-container h-100 mb-5 ${isFavorite ? 'favorite' : ''}`}>
      <Card.Body className="card-body card-container d-flex flex-column text-center">
        <Card.Header className="card-header">
          <div className="post-info"> {post.id} </div>
        </Card.Header>
        <Card.Title className="card-title mt-2">{(post.title)}</Card.Title>
        <Card.Text className="card-text flex-grow-1 body mt-4">{(post.body)}</Card.Text>
        <Link to={`/post/${post.id}`} onClick={handleOpenPost} className="btn btn-primary no-hover-effect align-self-center nav-link"> Visualizza</Link>
        <hr />
          {/* Icone  */}
        <div className="icons-container">
          <i className={`bi bi-chat comment-icon`} style={{ cursor: 'pointer' }} onClick={handleToggleCommentInput}></i>
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} text-danger favorite-icon`} onClick={handleToggleFavorite}></i>
          <i className="bi bi-share share-icon" style={{ cursor: 'pointer' }}></i>
        </div> <br />
        <div className="likes-container">
            <i className="bi bi-person-fill me-2"></i>{usersWhoLiked[0]} e altre {usersWhoLiked.length - 1} persone hanno messo Mi Piace
        </div> <br/>
         {/* Campo per inserire un commento */}
        {showCommentInput && (
          <InputGroup className="mt-3">
            <FormControl placeholder="Inserisci il commento" value={comment} onChange={handleCommentChange} />
            <Button variant="primary" onClick={handleAddComment}>Aggiungi</Button>
          </InputGroup>
        )}
      </Card.Body>
      {/* Conferma dell'azione */}
      {(showConfirmation || showCommentConfirmation) && (
        <div className="favorite-confirmation">
          <i className="bi bi-check-circle-fill"></i>
          <span className="text-center">{showCommentConfirmation ? '' : confirmationText}</span>
        </div>
      )}
    </Card>
  );
};

// Funzione per generare un ID univoco per il commento
function uniqueCommentId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default PostCard;

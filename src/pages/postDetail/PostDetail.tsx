import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Post, Comment } from '../../interfaces/PostInterfaces';
import { removeComment } from '../../features/posts/postSlice';
import { Card, Container } from 'react-bootstrap';
import './PostDetail.css';

const PostDetail: React.FC = () => {
  // Ottiene il post selezionato dallo stato
  const selectedPost = useSelector((state: RootState) => state.posts.openPost) as Post;
  // Ottiene i commenti associati al post
  const comments = useSelector((state: RootState) => state.posts.comments[selectedPost?.id] || []);
  const dispatch = useDispatch();

  // rimozione di un commento
  const handleRemoveComment = (commentId: number) => {
    dispatch(removeComment({ postId: selectedPost?.id, commentId: commentId.toString() }));
  };

  // Funzione per capitalizzare la prima lettera di una stringa
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Esempio di Array che rappresenta gli utenti che hanno messo "Mi Piace" al post 
  const usersWhoLiked = ["Tizio", "Caio", "Sempronio"];

  return (
    <Container>
      <div className="row h1-container">
        <h1 className="col-lg-8 text-center me-2 mb-0 text text-dark" style={{ fontSize: '3em', marginTop: "100px" }}>Post Detail</h1>
        <hr />
      </div>
      <Card className={`card-container h-100 mb-5 post-detail-card`}>
        <Card.Header className="card-header d-flex justify-content-between align-items-center">
          <div className="post-info">Post ID: {selectedPost.id}</div>
          <div className="post-info">User ID: {selectedPost.userId}</div>
        </Card.Header>
        <Card.Body className="card-body card-container d-flex flex-column text-center">
          <Card.Title className="card-title mt-2">{capitalizeFirstLetter(selectedPost.title)}</Card.Title>
          <Card.Text className="card-text flex-grow-1 body mt-4">{capitalizeFirstLetter(selectedPost.body)}</Card.Text>
          <hr />
          <div className="likes-container">
            <i className="bi bi-person-fill me-2"></i>{usersWhoLiked[0]} e altre {usersWhoLiked.length - 1} persone hanno messo Mi Piace
          </div> <br />

           {/* Sezione dei commenti */}
          <div className="comments-container">
          <h2 className='comment'>Commenti</h2>
          <ul>
            {comments.length > 0 ? ( // Verifica se ci sono commenti
              comments.map((comment: Comment) => (
                <li key={comment.id} className="d-flex align-items-center justify-content-between">
                  <div>
                    <i className="bi bi-person-fill me-2"></i> {comment.text}
                  </div>
                   {/* Icona per rimuovere il commento */}
                   <span style={{ cursor: 'pointer' }} onClick={() => handleRemoveComment(comment.id)} >
                     <i className="bi bi-trash-fill" style={{ color: 'dark' }}></i> 
                    </span>
                </li>
              )) 
              ) : (
                 // Mostra un messaggio se non ci sono commenti
              <p className='commento'>Nessun commento al post....</p>)}
          </ul>
        </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostDetail;

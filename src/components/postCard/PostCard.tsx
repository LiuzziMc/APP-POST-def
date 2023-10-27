import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { openPost, toggleFavorite } from '../../features/posts/postSlice';
import Avatar from '../../assets/images/Avatar.png';
import './PostCard.css';
import { Post } from '../../interfaces/PostInterfaces';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

interface PostCardProps {
  children?: React.ReactNode;
  post: Post;
  isInFavoritesPage?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isInFavoritesPage }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.posts.favorites);
  const usersWhoLiked = ["Tizio", "Caio", "Sempronio"];
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleOpenPost = () => {
    dispatch(openPost(post));
  };

  const handleRemoveFromFavorites = (postId: number) => {
    dispatch(toggleFavorite(postId));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(post.id));
    setConfirmationVisible(true);
    setTimeout(() => {
      setConfirmationVisible(false);
    }, 1000);
  };

  const isFavorite = favorites.includes(post.id);

  const handleShare = (socialMedia: string) => {
    const postUrl = `https://your-website.com/post/${post.id}`; // Sostituisci con il vero URL del post

    switch (socialMedia) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <Card className={`card-container h-100 mb-5 ${isFavorite ? 'favorite' : ''}`}>
      <Card.Body className="card-body card-container d-flex flex-column text-center">
        <Card.Header className="card-header">
          <img src={Avatar} alt="Comment Avatar" className="comment-avatar" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
          <div className="post-info"> {post.id} </div>
        </Card.Header>
        <Card.Title className="card-title mt-2">{(post.title)}</Card.Title>
        <Card.Text className="card-text flex-grow-1 body mt-4">{(post.body)}</Card.Text>
        <Link to={`/post/${post.id}`} onClick={handleOpenPost} className="btn btn-primary no-hover-effect align-self-center nav-link"> Visualizza</Link>
        <hr />
        <div className="icons-container">
        <Link to={`/post/${post.id}`}>
          <i className={`bi bi-chat comment-icon`} style={{ cursor: 'pointer' }}></i>
      </Link>
          <i className="bi bi-share share-icon" style={{ cursor: 'pointer' }} onClick={() => setIsSharing(!isSharing)}></i>
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} text-danger favorite-icon`} onClick={handleToggleFavorite}></i>
          {isInFavoritesPage && (
            <i className="bi bi-trash" style={{ cursor: "pointer", color: "dark" }} onClick={() => handleRemoveFromFavorites(post.id)} ></i>
          )}
        </div>
        <br />
        <div className="likes-container">
          <i className="bi bi-person-fill me-2"></i>{usersWhoLiked[0]} e altre {usersWhoLiked.length - 1} persone hanno messo Mi Piace
        </div>
        <br />
        {confirmationVisible && (
          <span className="confirmation-message text-white">{isFavorite ? 'Aggiunto ai preferiti' : 'Rimosso dai preferiti'}</span>
        )}
        {isSharing && (
          <div className="social-share-icons">
            <FaFacebook
              onClick={() => handleShare('facebook')}
              style={{ cursor: 'pointer', fontSize: '24px', color: 'blue', margin: '0 10px' }}
            />
            <FaWhatsapp
              onClick={() => handleShare('whatsapp')}
              style={{ cursor: 'pointer', fontSize: '24px', color: 'green', margin: '0 10px' }}
            />
            <FaInstagram
              onClick={() => handleShare('instagram')}
              style={{ cursor: 'pointer', fontSize: '24px', color: 'purple', margin: '0 10px' }}
            />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default PostCard;

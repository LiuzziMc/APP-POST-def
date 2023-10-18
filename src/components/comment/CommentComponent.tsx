import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommentsForPost } from "../../features/comments/commentSlice";
import { AppDispatch, RootState } from "../../app/store";
import { Button } from "react-bootstrap";
import Avatar from "../../assets/images/Avatar.png";

interface Comment {
  id: number;
  name: string;
  body: string;
  email: string;
}

interface CommentComponentProps {
  postId: number;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ postId }) => {
  const dispatch: AppDispatch = useDispatch();
  const comments: Comment[] = useSelector(
    (state: RootState) => state.comments.comments
  );
  const status = useSelector((state: RootState) => state.comments.status);
   //  visualizzazione di tutti i commenti
  const [showAllComments, setShowAllComments] = useState(false);

   // Funzione per gestire il toggle dei commenti
  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  // Creazione dell'avatar per ogni commento
  const commentAvatar = (
    <img src={Avatar} alt="Comment Avatar" className="comment-avatar" style={{ width: "30px", height: "30px", borderRadius: "50%" }}/>
  );

  // caricare i commenti in base al postId
  useEffect(() => {
    if (postId) {
      dispatch(fetchCommentsForPost(postId));
    }
  }, [dispatch, postId]);

  if (status === "loading") {
    return <p> Loading </p>;
  }
  if (status === "failed") {
    return <p>Si è verificato un errore durante il recupero dei commenti.</p>;
  }

  return (
    <>
      <div className="comments-container">
        <h2 className="comment">Commenti</h2>
        <ul className="comment-list">
          {comments.slice(0, showAllComments ? comments.length : 1).map((comment) => (
              <li key={comment.id} className="comment-item">
                <div className="comment-info">
                  {commentAvatar} <br />{" "}
                  {/* Utilizza l'avatar per ogni commento */}
                  <strong>{comment.email}</strong> <br /> -{" "}
                  <span>{comment.name}</span>
                </div>
              </li>
            ))}
        </ul>
        {comments.length > 1 && (
          <Button onClick={handleToggleComments} className="btne">
            {showAllComments ? (
              <>
                <i className="bi bi-chevron-up text-dark"></i>
              </>
            ) : (
              <>
                <i className="bi bi-chevron-down text-dark"></i>
              </>
            )}
          </Button>
        )}
      </div>
    </>
  );
};

export default CommentComponent;

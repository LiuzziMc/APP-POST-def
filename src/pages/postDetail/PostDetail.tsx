import React, {  } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Post } from "../../interfaces/PostInterfaces";
import { Card, Container } from "react-bootstrap";
import "./PostDetail.css";
import CommentComponent from "../../components/comment/CommentComponent";
import UserComponent from "../../components/user/UserComponent";

const PostDetail: React.FC = () => {
  const selectedPost = useSelector(
    (state: RootState) => state.posts.openPost
  ) as Post;

  if (!selectedPost) {
    return <div>Caricamento in corso...</div>;
  }
  
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Container className="container">
       <div className="row h1-container">
       <h1 className="col-lg-8 text-center me-2 mb-0 text text-dark" style={{ fontSize: "3em", marginTop: "100px" }}> Dettaglio Post </h1>
        <hr />
      </div>
      {/* Card contenente il dettaglio del post */}
      <Card className={`card-container h-100 mb-5 post-detail-card`}>
        {/* Info Utenti */}
        <UserComponent userId={selectedPost.userId} />
        <Card.Body className="card-body card-container d-flex flex-column text-center">
          <Card.Title className="card-title mt-2">
            {capitalizeFirstLetter(selectedPost.title)}
          </Card.Title>
          <Card.Text className="card-text flex-grow-1 body mt-4">
            {capitalizeFirstLetter(selectedPost.body)}
          </Card.Text>
          <hr />
          <br />
          {/* Commenti */}
          <CommentComponent postId={selectedPost.id} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostDetail;

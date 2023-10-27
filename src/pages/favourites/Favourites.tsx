import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import PostCard from "../../components/postCard/PostCard";
import { Post } from "../../interfaces/PostInterfaces";
import { toggleFavorite } from "../../features/posts/postSlice"; 
import { Container } from "react-bootstrap";


const Favourites = () => {
    const favoritePostIds = useSelector((state: RootState) => state.posts.favorites);
    const allPosts: Post[] = useSelector((state: RootState) => state.posts.data);
    const dispatch = useDispatch();
  
    const favoritePosts = allPosts.filter((post) => favoritePostIds.includes(post.id));
    

    const handleRemoveFromFavorites = (postId: number) => { 
      const shouldRemove = window.confirm("Sei sicuro di voler rimuovere questo post dai preferiti?");
      if (shouldRemove) {
        dispatch(toggleFavorite(postId));
      } else {
        window.alert("Eliminazione annullata");
      }
    };
    

    return (
    <Container>
        <div className="row">
          <div className="col-12">
            <div className="row h1-container">
              <h1 className="col-lg-8 text-center me-2 mb-0 text text-dark"style={{ fontSize: "4em", marginTop: "100px" }} >Post Preferiti </h1>
              <hr />
            </div>
          </div>
          {favoritePosts.length === 0 && (
            <div className="col text-center mt-4">
              <p>Non ci sono post nei preferiti.</p>
            </div>
          )}
          {favoritePosts.map((post) => (
            <div className="col-12 col-md-6 col-lg-4 mb-5" key={post.id}>
              <PostCard post={post}  isInFavoritesPage={true} >
              <i className="bi bi-trash post-card-trash-icon" style={{ cursor: "pointer", color: "dark" }} onClick={() => handleRemoveFromFavorites(post.id)}></i>
              </PostCard>
            </div>
          ))}
        </div>
        </Container>
    );
  };
  
  export default Favourites;
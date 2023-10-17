import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../features/posts/postSlice';
import { AppDispatch, RootState } from '../../../app/store';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Post } from '../../../interfaces/PostInterfaces';
import PostCard from '../../postCard/PostCard';
import './PaginationComponent.css';

function PaginationComponent() {
  const dispatch: AppDispatch = useDispatch();
  const { data: posts, status, error } = useSelector((state: RootState) => state.posts);
  const searchQuery = useSelector((state: RootState) => state.posts.search);
  // Stati locali per la paginazione
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Funzione per gestire il cambiamento della dimensione della pagina
  const handleChangeItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  // useEffect per richiedere i post in base alla query di ricerca
  useEffect(() => {
    dispatch(fetchPosts({ start: 0, limit: 20, title: searchQuery }));
  }, [dispatch, searchQuery]);

  // Filtra i post in base alla query di ricerca
  const filteredPosts = searchQuery ? posts.filter((post: Post) => post.title.toLowerCase().includes(searchQuery.toLowerCase())) : posts;
  // console.log('searchQuery:', searchQuery);
  // console.log('Filtered posts:', filteredPosts);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

   // post da mostrare sulla pagina 
  let postsToShow: Post[] = [];
  if (filteredPosts) {
    postsToShow = filteredPosts.slice(startIndex, endIndex);
  }

  // cambio di pagina
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Container className="mt-5">
      <div className="row h1-container">
        <h1 className="col-lg-8 text-center me-2 mb-0 text text-dark" style={{ fontSize: '4em' }}>Post List</h1>
        <hr />
      </div>
       {/* Selezione dimensione pagina */}
      <div className="d-flex justify-content-end mt-3">
        <span className="select-label">Scegli la dimensione della pagina:</span>
        <select className="form-select select-box" value={itemsPerPage} onChange={handleChangeItemsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'failed' ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {/* Griglia di post */}
          <Row xs={1} md={3} className="g-4 mb-5">
            {postsToShow.map((post: Post) => (
              <Col key={post.id}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>

          {/* Paginazione */}
          <div className="mt-4 d-flex justify-content-center">
            <Pagination className='pagination'>
              <Pagination.Prev className='prev' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next className='next' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
            </Pagination>
          </div>
        </div>
      )}
    </Container>
  );
}

export default PaginationComponent;

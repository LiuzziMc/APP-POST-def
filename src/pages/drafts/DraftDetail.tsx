import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useParams } from 'react-router-dom';
import { Draft } from '../../features/drafts/draftSlice';
import { Card, Container } from 'react-bootstrap';

const DraftDetail: React.FC = () => {
  const { draftId } = useParams<{ draftId: string }>();
  const draft: Draft | undefined = useSelector((state: RootState) =>
    state.drafts.drafts.find((d) => d.id === draftId)
  );

  if (!draft) {
    return <div>Draft not found</div>;
  }
  

  return (
    <Container className="container">
      <div className="row h1-container">
        <h1 className="col-lg-8 text-center me-2 mb-0 text text-dark" style={{ fontSize: "3em", marginTop: "100px" }}> Dettaglio Bozza </h1>
        <hr />
      </div>
      <Card className={`card-container h-100 mb-5 post-detail-card`}>
        <Card.Body className="card-body card-container d-flex flex-column text-center">
          <Card.Title className="card-title mt-2">
            {draft.title}
          </Card.Title>
          <Card.Text className="card-text flex-grow-1 body mt-4 m-b">
            {draft.body}
          </Card.Text>
          <hr />
          <Card.Text className="card-id">
            <strong>ID:</strong> {draft.id}
          </Card.Text>
          <Card.Text className="card-link">
            <strong>Link:</strong> {draft.link || 'N/A'}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Visibilità:</strong> {draft.visibility}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Restrizioni:</strong> {draft.restrictions}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Commentabile:</strong> {draft.commentable ? 'Sì' : 'No'}
          </Card.Text>

          <Card.Text className="card-date">
             <strong>Data di Creazione:</strong> {new Date(draft.creationDate).toLocaleString()} <br />
             <strong>Ultima Modifica:</strong> {new Date(draft.editDate).toLocaleString()} <br />
             <strong>Data di Scadenza:</strong> {draft.expiryDate}
        </Card.Text>
        
          <br />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DraftDetail;

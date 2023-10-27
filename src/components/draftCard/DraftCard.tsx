import { useDispatch } from "react-redux";
import { Draft, removeDraft } from "../../features/drafts/draftSlice";
import { openPost } from "../../features/posts/postSlice";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface DraftProps {
  draft: Draft;
  children?: React.ReactNode;
  onEdit: (draft: Draft) => void;
}

const DraftCard: React.FC<DraftProps> = ({draft, onEdit}) => {
  const dispatch = useDispatch();

  const handleOpenPost = () => {
    dispatch(openPost(draft));
  };

  const handleEditDraft = () => {
    onEdit(draft);
  };
  
  const handleDeleteDraft = () => {
    const isConfirmed = window.confirm("Sei sicuro di voler eliminare questa bozza?"); 

    if (isConfirmed) {
      if (draft.id) {
        dispatch(removeDraft(draft.id));
      }
    }
  }

  return (
    <Card className="card-form h-80 ms-4">
      <Card.Body>
        <Card.Title className="card-title text-center">{draft.title}</Card.Title>
        <hr />
        <Card.Text> <span style={{ fontSize: '15px'}}>Ultima modifica:</span> <br />
           <span style={{ fontSize: '12px'}}>{new Date(draft.editDate).toLocaleString()}</span>
        </Card.Text>

        <div className="d-flex justify-content-center align-items-center">
        <Link to="#" className="ms-2" onClick={handleEditDraft}>
            <i className="bi bi-pencil"></i>
          </Link>
          <Link to={`/draft/${draft.id}`} className="btn btn-primary no-hover-effect ms-5" onClick={handleOpenPost}>
            Visualizza
          </Link>
          <div className="ms-auto"> 
            <i className="bi bi-trash" onClick={handleDeleteDraft}></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DraftCard;

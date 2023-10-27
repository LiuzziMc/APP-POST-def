import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {  removeDraft } from "../../features/drafts/draftSlice";
import { Draft } from "../../features/drafts/draftSlice";
import DraftFormModal from "../../components/draftModal/DraftFormModal";
import DraftCard from "../../components/draftCard/DraftCard";
import { Col, Row } from "react-bootstrap";
import "./DraftList.css";

function DraftList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDraft, setSelectedDraft] = useState<Draft | null>(null);
  const drafts = useSelector((state: RootState) => state.drafts.drafts);
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDraft(null);
  };
  
  
  const handleSelectDraft = (draft: Draft) => {
    if (draft.id === "") {
      setSelectedDraft(null);
    } else {
      setSelectedDraft(draft);
    }
    openModal();
  };

  useEffect(() => { 
    const draftExpiry = () => {
      const currentDate = new Date().getTime();
      console.log('data corrente', new Date(currentDate).toLocaleString());

      const draftsToRemove = drafts.filter((draft) => {
        if(draft.expiryDate) {
          const expiryDate = new Date(draft.expiryDate).getTime();
          console.log('data di scadenza:' , new Date(expiryDate).toLocaleString());
        }
        return false;
      });
      // console.log('bozza scaduta:' , draftsToRemove);
      draftsToRemove.forEach((draft) => {
        // console.log('rimozione bozza scaduta', draft.id);
        if (draft.id) {
          dispatch(removeDraft(draft.id));
        }
      });
      
    }; draftExpiry();
    const interval = setInterval(() => {
      draftExpiry();
    }, 8000);

    return() => {
      clearInterval(interval);
    };
  }, [drafts])



  return (
    <>
    
      <h1 className="text-center text-dark text">Bozze</h1>
      <hr />
      <button className="btn btn-primary no-hover-effect align-self-center button" onClick={openModal} > Aggiungi una nuova bozza </button>
      {isModalOpen && (
        <>
          <button onClick={closeModal}> &times; </button>
          <DraftFormModal selectDraft={selectDraft} closeModal={closeModal} />
        </>
      )}

      <Row xs={1} md={5} className="me-3">
        {drafts.map((draft: Draft) => (
          <Col key={draft.id}>
           <DraftCard draft={draft} onEdit={handleSelectDraft} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default DraftList;

function dispatch(arg0: { payload: string; type: "draft/removeDraft"; }) {
  throw new Error("Function not implemented.");
}

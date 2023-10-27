import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addDraft, editDraft } from "../../features/drafts/draftSlice";
import { Draft } from "../../features/drafts/draftSlice";
import { AppDispatch } from "../../app/store";

interface DraftFormModalProps {
  selectDraft: Draft | null;
  closeModal: () => void;
}

const schemaDraft = z.object({
  title: z.string().max(150).min(2),
  body: z.string().min(6).max(1000),
  link: z.string().optional(),
  visibility: z.enum(["public", "private"]),
  restrictions: z.enum([
    "solo io",
    "tutti i miei amici",
    "una cerchia di amici",
  ]),
  commentable: z.boolean(),
  expiryDate: z.string().optional(),
});

type FormData = z.infer<typeof schemaDraft>;

const DraftFormModal: React.FC<DraftFormModalProps> = ({
  selectDraft,
  closeModal,
}) => {
  const {register, handleSubmit,formState: { errors, isSubmitting },reset,} = useForm<FormData>({ resolver: zodResolver(schemaDraft),});
  const dispatch: AppDispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const onSubmit = (data: FormData) => {
    if (selectDraft) {
      const editedDraft: Draft = {
        ...selectDraft,
        title: data.title,
        body: data.body,
        visibility: data.visibility,
        commentable: data.commentable, 
        restrictions: data.restrictions,
        editDate: Date.now(),
      };
  
      dispatch(editDraft(editedDraft));
      setIsEditing(true);
    } else {
      const newDraft: Draft = {
        id: "",
        title: data.title,
        body: data.body,
        visibility: data.visibility,
        commentable: data.commentable, 
        restrictions: data.restrictions,
        creationDate: Date.now(),
        editDate: Date.now(),
        expiryDate: data.expiryDate, 
      };
      
      dispatch(addDraft(newDraft));
      setIsEditing(false); 
    }
  
    setShowSuccessMessage(true);
  
    setTimeout(() => {
      closeModal();
      reset();
    }, 1500);
  };


  


  useEffect(() => {
    if (selectDraft) {
      reset({
        title: selectDraft.title,
        body: selectDraft.body,
      });
    }
  }, [reset, selectDraft]);
  

  return (
    <div className="div-form">
    <h3 className="text-center text-dark modal-title">
        <strong>{selectDraft ? 'Modifica bozza' : 'Crea una nuova bozza'}</strong>
      </h3>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="form">

        <div className="form-group">
          <label>
            <strong>Titolo</strong>
          </label>
          <input type="text"id="title"placeholder="Titolo"{...register("title")} className="input" />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>
            <strong>Testo</strong>
          </label>
          <textarea id="body" placeholder="Corpo" {...register("body")} className="textarea" />
          {errors.body && (
            <p className="error-message">{errors.body.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>
            <strong>Link</strong>
          </label>
          <input type="text" id="link"placeholder="Link (opzionale)" {...register("link")} className="input"/>
        </div>

        <div className="data-input">
          <label>
            <strong>Data di scadenza</strong>
          </label>
          <input type="date" id="expiryDate"placeholder="Data Scadenza (opzionale)"{...register("expiryDate")} className="input" />
        </div>
      
        <div className="select-container">
          <label>
            <strong>Visibilità:</strong>
          </label>
          <select id="visibility" {...register("visibility")} className="select">
            <option value="public">Pubblico</option>
            <option value="private">Privato</option>
          </select>

          <label>
            <strong>Chi può vedere:</strong>
          </label>
          <select id="restrictions" {...register("restrictions")} className="select" >
            <option value="solo io">Solo io</option>
            <option value="tutti i miei amici">Tutti i miei amici</option>
            <option value="una cerchia di amici">Una cerchia di amici</option>
          </select>
          </div>
        
        <div className="check">
          <label>
            <strong>Commenti:</strong>
          </label>
          <input type="checkbox"id="commentable" {...register("commentable")}className="checkbox"defaultChecked={selectDraft ? selectDraft.commentable : false} /> Commentabile
        </div>
    
        <button type="submit" className="btn btn-primary no-hover-effect align-self-center mt-5" >
        {selectDraft ? 'Modifica bozza' : 'Crea bozza'}
        </button>
        {isSubmitting && <p>Invio...</p>}
        {showSuccessMessage && (
      <p className="text-success text-center mt-2">
      {isEditing ? 'Bozza modificata con successo' : 'Bozza creata con successo'}
      </p>
          )}
        {Object.keys(errors).length > 0 && <p className="text-danger text-center mt-2"> Errore nella creazione della bozza, compila i campi obbligatori</p>}

      </form>
    </div>
  );
};

export default DraftFormModal;
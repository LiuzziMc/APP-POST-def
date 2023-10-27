import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Draft {
    [x: string]: any;
    id?: string;
    title: string;
    body: string;
    link?: string;   
}

interface DraftState {
    drafts: Draft[];
}

const initialState: DraftState = {
    drafts: [],
}

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        addDraft: (state, action: PayloadAction<Partial<Draft>>) => {
            const newDraft: Draft = {
                id: uuidv4(),
                title: action.payload.title || '',
                body: action.payload.body || '',
                expiryDate: action.payload.expiryDate || '',  
                creationDate: Date.now(),
                editDate: Date.now(),
            };
            state.drafts.push(newDraft);
        },

        removeDraft: (state, action: PayloadAction<string>) => {
            state.drafts = state.drafts.filter((draft) => draft.id !== action.payload);
        },

        editDraft: (state, action: PayloadAction<Draft>) => {
            const draftIndex = state.drafts.findIndex((draft) => draft.id === action.payload.id);
            if (draftIndex !== -1) {
                state.drafts[draftIndex] = action.payload;
            }
        },
        
    },
});

export const { addDraft, removeDraft, editDraft } = draftSlice.actions;
export default draftSlice.reducer;

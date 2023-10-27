export interface Post {
  
    isDraft: boolean;
    userId: number;
    id: number;
    title: string;
    body: string;
    isFavorite: boolean;
    comments: Comment[]; 
    onToggleFavorite: () => void;
  }

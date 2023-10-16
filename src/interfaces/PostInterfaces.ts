export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    isFavorite: boolean;
    comments: Comment[]; 
    onToggleFavorite: () => void;
  }
  export interface Comment {
    id: number;
    text: string;
    username: string;
  }
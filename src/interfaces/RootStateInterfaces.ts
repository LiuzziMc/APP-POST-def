import { Post } from "./PostInterfaces";


export interface RootState {
    posts: {
      data: Post[]; 
      status: string;
      error: string | null;
    };
  }
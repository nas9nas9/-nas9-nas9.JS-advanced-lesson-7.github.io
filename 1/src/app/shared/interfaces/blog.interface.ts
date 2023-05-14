export interface IBlog {
  id: number;
  author: string;
  title: string;
  text: string;
  image: string;
}

export interface IBlogRequest {
  author: string;
  title: string;
  text: string;
  image: string;
}

export interface IBlogResponce extends IBlogRequest {
  id: number;
}

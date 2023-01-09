export type TStatus = "pending" | "success" | "error";

export interface IContact {
  name: string;
  email: string;
  message: string;
}

export interface IPost {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
  content?: string;
}

export interface INotification {
  title: string;
  message: string;
  status: TStatus;
}

export interface IPostData {
  content: string;
  slug: string;
  [key: string]: any;
}

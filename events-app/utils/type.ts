export interface IEventItems {
  _id?: string;
  title: string;
  description?: string;
  location: string;
  date: string;
  image: string;
  isFeatured?: boolean;
}
export interface IEvents {
  events: IEventItems[];
  newsletter: {
    email: string;
  }[];
  [key: string]: Object[];
}
export interface IComments {
  _id?: string;
  eventId?: string | string[] | undefined;
  email: string;
  name: string;
  text: string;
}

export interface INewsletter {
  email: string;
}

export interface IError {
  isError: boolean;
  errorMessage: string;
}

export interface INotification {
  title: string;
  message: string;
  status: string;
}

export interface INotificationContext {
  notification: INotification | null;
  showNotification: (notificationData: INotification) => void;
  hideNotification: () => void;
}

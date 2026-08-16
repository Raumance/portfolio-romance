export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactPayload {
  _id: string;
  read: boolean;
  createdAt: string;
}

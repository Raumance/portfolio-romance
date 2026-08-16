export interface User {
  id: string;
  email: string;
  role: 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

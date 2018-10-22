export interface AuthState {
  isAuthenticated: boolean;
  user: UserState;
  refresh: string;
  token: string;
}

export interface UserState {
  userId: string;
  userName: string;
  userEmail: string;
}

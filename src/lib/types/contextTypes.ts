export interface UserContextType {
  name: string | null;
  email: string | null;
  id: number | null;
  updateUser: (user: { name: string; email: string; id: number }) => void;
  logout: () => void;
}

export interface AuthContextType {
  isLogged: boolean;
  updateAuth: (auth: { isLogged: boolean }) => void;
}

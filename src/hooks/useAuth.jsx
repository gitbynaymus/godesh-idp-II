import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

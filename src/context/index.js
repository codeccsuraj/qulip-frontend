import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import { GigContext } from "./gigContext/GigContext";

export { default as AuthContextProvider } from './authContext/AuthContext';
export { default as GigContextProvider } from './gigContext/GigContext'

export const useAuthContext = () => useContext(AuthContext);
export const useGigContext = () => useContext(GigContext);
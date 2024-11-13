import { useReducer } from "react";
import { createContext, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(action, state) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };
  }
}

const FAKE_USER = {
  name: "Ahmad",
  email: "winterfell551@gmail.com",
  password: "1111",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

//created Provider
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={(user, isAuthenticated, login, logout)}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthConsumer() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
}

export { AuthProvider, useAuthConsumer };

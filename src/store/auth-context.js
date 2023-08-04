import { createContext, useState } from "react";

const AuthContext = createContext({
  isAuth: false,
  login: (loginData) => {},
  register: (regData) => {},
  logout: () => {},
  token: null,
  user: {},
  isAdmin: false,
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const isAuth = !!token;
  let isAdmin = false;
  if (localStorage.getItem("user")) {
    isAdmin = user.role_id === 1;
  }

  const loginHandler = (data) => {
    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const registerHandler = (data) => {
    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };

  const contextValue = {
    isAuth: isAuth,
    login: loginHandler,
    register: registerHandler,
    logout: logoutHandler,
    token: token,
    user: user,
    isAdmin: isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

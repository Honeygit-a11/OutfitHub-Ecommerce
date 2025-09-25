import { createContext, use, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
  const [user , setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth-user');
    if (storedUser) setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [])

  // login should accept either the full response object or a user object
  const login = (payload) =>{
    // if payload has .user, use it; otherwise assume payload is the user
    const u = payload && payload.user ? payload.user : payload;
    if (u) {
      setUser(u);
      localStorage.setItem('auth-user', JSON.stringify(u));
    }
  }
  const logout = ()=>{
    setUser(null);
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
  }

  return(
    <AuthContext.Provider value = {{user,login,logout}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
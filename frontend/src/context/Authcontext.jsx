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

  const login = (userData) =>setUser(userData.user);
  const logout = ()=>setUser(null);
  return(
    <AuthContext.Provider value = {{user,login,logout}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
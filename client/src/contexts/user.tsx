import { createContext, FC, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@types";
export const userContext = createContext<any>(null);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    axios
      .get("http://localhost:5400/auth/user", { withCredentials: true })
      .then((res) => {
        setUser({
          username: res.data.user.username,
          email: res.data.user.email,
          is_admin: res.data.user.is_admin,
        });
      })
      .catch((err) => {
        // user not verified or session token not present
        setUser(null);
      });
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

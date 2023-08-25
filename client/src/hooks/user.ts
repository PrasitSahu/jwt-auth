import { useState } from "react";
import { User } from "../@types/";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  
  return [user, setUser] as const;
};

export default useUser;

import { userContext } from "contexts";
import { useContext } from "react";

const useUser = () => {
  const userInstance = useContext(userContext);
  const { user, setUser } = userInstance;

  return [user, setUser] as const;
};

export default useUser;

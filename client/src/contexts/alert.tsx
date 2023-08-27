import { FC, createContext, useState } from "react";
import { AlertType } from "@types";

export const alertContext = createContext<any>(null);

const AlertProvider: FC<{ children: any }> = ({ children }) => {
  const [info, setInfo] = useState<AlertType>({
    title: "Title",
    type: "info",
    show: false
  });
  return (
    <alertContext.Provider value={{ info, setInfo }}>
      {children}
    </alertContext.Provider>
  );
};

export default AlertProvider;

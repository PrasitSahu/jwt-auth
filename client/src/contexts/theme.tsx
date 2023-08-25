import { createContext, useState, ReactNode, FC, useEffect } from "react";
import { ThemeType, ThemeContextType } from "../@types";

export const themeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const getSysTheme = () =>
    window.matchMedia("(prefer-color-scheme): dark").matches
      ? ("dark" as ThemeType)
      : ("light" as ThemeType);
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem("theme") as ThemeType) || getSysTheme()
  );

  const root: Element = document.documentElement;
  function updateTheme(theme: ThemeType) {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  });

  return (
    <themeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;

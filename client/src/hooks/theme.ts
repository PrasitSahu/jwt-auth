import { useContext } from "react";
import { themeContext } from "contexts";
import { ThemeContextType, ThemeType } from "@types";

const useTheme = (): [ThemeType, (param: ThemeType) => void] => {
  const { theme, updateTheme } = useContext(themeContext) as ThemeContextType;
  return [theme, updateTheme];
};

export default useTheme;

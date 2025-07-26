import { useContext } from "react";
import { Theme } from "../context/ThemeContext";

const useTheme = () => {
  const [theme] = useContext(Theme);
  return theme;
};

export default useTheme;

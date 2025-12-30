import { IReactNode } from "@/interfaces";
import { ThemeClientProvider } from "../themeClientProvider";

export const AppProvider = ({ children }: IReactNode) => {
  return <ThemeClientProvider>{children}</ThemeClientProvider>;
};

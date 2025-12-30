import { DashboardProvider } from "../dashboardProvider";
import { IReactNode } from "@/interfaces";
import { ThemeClientProvider } from "../themeClientProvider";

export const AppProvider = ({ children }: IReactNode) => {
  return (
    <ThemeClientProvider>
      <DashboardProvider>{children}</DashboardProvider>
    </ThemeClientProvider>
  );
};

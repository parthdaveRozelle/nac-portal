import { IReactNode } from "@/interfaces";
import { DashboardProvider } from "@/providers";

export default function DashboardLayout({ children }: IReactNode) {
  return <DashboardProvider>{children}</DashboardProvider>;
}

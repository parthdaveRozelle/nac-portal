import { LoginVerificationGuard } from "@/components";
import { IReactNode } from "@/interfaces";
import { DashboardProvider } from "@/providers";

export default function DashboardLayout({ children }: IReactNode) {
  return (
    <LoginVerificationGuard>
      <DashboardProvider>{children}</DashboardProvider>
    </LoginVerificationGuard>
  );
}

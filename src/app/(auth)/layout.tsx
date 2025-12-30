import { IReactNode } from "@/interfaces";
import { AuthProvider } from "@/providers";

export default function AuthLayout({ children }: IReactNode) {
  return <AuthProvider>{children}</AuthProvider>;
}

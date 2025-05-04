import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./AuthProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ReactQueryProvider>
  );
}

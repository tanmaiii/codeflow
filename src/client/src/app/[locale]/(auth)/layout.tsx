import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | CodeFlow",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <h4>Layout đăng nhập</h4>
      <div>{children}</div>
    </div>
  );
}

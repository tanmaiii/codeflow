import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | CodeFlow",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <h4>Layout Admin</h4>
      <div>{children}</div>
    </div>
  );
}

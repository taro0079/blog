import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

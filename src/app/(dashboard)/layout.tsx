import { LayoutProps } from "@/types/layout";
import { Header } from "@/components/layout/shared/Header";
import { Footer } from "@/components/layout/shared/Footer";
// import { Sidebar } from "@/components/layout/shared/Sidebar";

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
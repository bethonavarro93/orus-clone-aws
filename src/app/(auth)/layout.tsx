import { LayoutProps } from "@/types/layout";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {children}
      </div>
    </div>
  );
}

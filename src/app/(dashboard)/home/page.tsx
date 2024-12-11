// src/app/(dashboard)/home/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <p>Role: {session.user?.role}</p>
    </div>
  );
}

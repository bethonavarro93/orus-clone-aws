import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientSideHome from "./client-demo";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <ClientSideHome session={session} />;
}

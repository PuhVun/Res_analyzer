import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/ui/sidebar";
import { ResumeProvider } from "@/lib/resume-store";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  return (
    <ResumeProvider>
      <div style={{ display: "flex", minHeight: "100vh", background: "#0d0d14" }}>
        <DashboardSidebar
          userName={user?.firstName ?? "User"}
          userEmail={user?.emailAddresses[0]?.emailAddress ?? ""}
          userImage={user?.imageUrl ?? ""}
        />
        <main style={{ flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </ResumeProvider>
  );
}

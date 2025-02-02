import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/Sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div>
          <SidebarProvider>
          <AppSidebar />
        {children}
        </SidebarProvider>
      </div>
  )
}

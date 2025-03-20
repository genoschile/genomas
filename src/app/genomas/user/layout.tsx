import FooterLanding from "@/components/footer/FooterLanding";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import SidebarUser from "@/components/sidebar/SidebarUser";
import { AuthContextProvider } from "@/context/authContext";
import { UserContextProvider } from "@/context/userContext";

import "./layout.css";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <div className="userWorkspace--container">
          <HeaderUserWorkspace className="wu-header" />
          <SidebarUser className="wu-aside" />
          <main className="wu-main">{children}</main>
          <FooterLanding className="wu-footer" />
        </div>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

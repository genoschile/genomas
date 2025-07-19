import { HeaderTabs } from "@/components/analysis/headerTabs/HeaderTabs";
import "./layout.css"
export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="analysys-container project__home--standardContainer">
      <HeaderTabs />
      {children}
    </section>
  );
}

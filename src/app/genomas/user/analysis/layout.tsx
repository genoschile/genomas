import { HeaderTabs } from "@/components/analysis/headerTabs/HeaderTabs";
import "./layout.css"
export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="analysys-container">
      <HeaderTabs />
      {children}
    </section>
  );
}

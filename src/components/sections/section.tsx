/* styles */
import "./section.css";

/* types */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className = "" }: SectionProps) {
  return <section className={`container ${className}`}>{children}</section>;
}

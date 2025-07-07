/* types */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}
import styles from "./section.module.css";

export default function Section({ children, className = "" }: SectionProps) {
  return <section className={`${styles.container} ${className}`}>{children}</section>;
}

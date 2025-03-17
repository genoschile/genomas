import Link from "next/link";
import "./buttonPrimary.css";

export default function ButtonPrimary({
  link,
  text,
  className,
}: {
  link: string;
  text: string;
  className?: string;
}) {
  return (
    <Link className={`button--primary ${className}`} href={link}>
      {text}
    </Link>
  );
}

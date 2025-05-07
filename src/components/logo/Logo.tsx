import Link from "next/link";
import "./logo.css";

export default function Logo() {
  return (
    <Link className={`header-landing__brand`} href="/">
      Genomas
    </Link>
  );
}

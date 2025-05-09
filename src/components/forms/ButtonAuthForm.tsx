import Link from "next/link";
import { AuthLink } from "./components/AuthLink";

export default function ButtonAuthForm() {
  return (
    <div className="auth-form__button-container">
      <button type="submit" className="auth-form__submit-button">
        hola
      </button>

      <div className="auth-form--or">
        <div></div>
        <strong>OR</strong>
        <div></div>
      </div>

      <Link href="#" className="auth-form__submit-button">
        {"Continue with Enterprise ID"}
      </Link>

      <AuthLink
        text={"hola"}
        textPost={"authTranslations.joinNowLink"}
        href="/signup"
      />
    </div>
  );
}

import "./authLink.css";

import Link from "next/link";

interface AuthLinkProps {
  text: string;
  href: string;
  textPost: string;
}

export const AuthLink: React.FC<AuthLinkProps> = ({ text, href, textPost }) => {
  return (
    <div>
      <p className="auth-form__login-text">
        {text}
        <Link href={href} className="auth-form__login-link">
          {textPost}
        </Link>
      </p>
    </div>
  );
};

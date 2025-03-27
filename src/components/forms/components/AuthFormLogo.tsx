import "./authFormLogo.css"

export function AuthFormLogo() {
  return (
    <figure className="auth-form__logo-container">
      <img
        src="/images/genomas.png"
        className="auth-form__logo"
        alt="logo genomas"
      />
      <figcaption>Logo genomas</figcaption>
    </figure>
  );
}

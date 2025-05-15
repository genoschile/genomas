"use client";

/* styles */
import { AuthFormLogo } from "@/components/forms/components/AuthFormLogo";
import { AuthLink } from "@/components/forms/components/AuthLink";

export function FormSignUp() {
  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        <form className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">Sign Up</legend>
            <div className="auth-form__input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="auth-form__input"
              />
            </div>

            <div className="auth-form__input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="auth-form__input"
              />
            </div>

            <div className="auth-form__input-group">
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input
                type="password"
                id="repeat-password"
                name="repeatPassword"
                placeholder="Repeat your password"
                className="auth-form__input"
              />
            </div>

            <div className="auth-form__button-container">
              <button
                type="submit"
                className="auth-form__submit-button"
                disabled={true}
              >
                Create Account
              </button>

              <AuthLink
                text="Already in GENOMAS?"
                textPost="Login"
                href="/login"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

"use client";

import "../../../../../../components/forms/form.css";
/* styles */
import { AuthFormLogo } from "@/components/forms/components/AuthFormLogo";
import { AuthLink } from "@/components/forms/components/AuthLink";
import { submitSignUpEnterprise } from "@/core/use-cases/organization/auth";
import { useOrganizationContext } from "@/hooks/useOrganization";
import router from "next/router";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export function FormSignUp() {
  const [state, action, pending] = useActionState(
    submitSignUpEnterprise,
    undefined
  );
  const { updateOrganization } = useOrganizationContext();

  useEffect(() => {
    if (state?.success && state.user) {
      const { id, name, email } = state.user;

      console.log({ id, name, email });

      updateOrganization({ id: id, name, email });
    }

    if (state?.success) {
      toast.success(state.message || "Login successful!");
      router.push("/genomas/enterprise");
    } else if (state?.message) {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state, updateOrganization]);

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        <form method="POST" action={action} className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">Sign Up</legend>

            <div className="auth-form__input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="auth-form__input"
              />

              {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>

            <div className="auth-form__input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="auth-form__input"
              />

              {state?.errors?.email && <p>{state.errors.email}</p>}
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

              {state?.errors?.password && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="auth-form__button-container">
              <button
                type="submit"
                className="auth-form__submit-button"
                disabled={pending}
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

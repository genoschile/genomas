"use client";

/* server actions */
import { submitSignUp } from "@/lib/actions/auth";

/* types */
import type { ActionResponse } from "@/lib/types/formTypes";

/* hooks */
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

/* styles */
import "./form.css";
import { AuthFormLogo } from "./components/AuthFormLogo";
import { AuthLink } from "./components/AuthLink";
import { FormSignUpSkeleton } from "@/app/[lang]/(auth)/signup/FormSignUpSkeleton";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export function FormSignUp() {
  const [state, actions, isPending] = useActionState(
    submitSignUp,
    initialState
  );
  const router = useRouter();

  console.log({
    initialState: initialState,
    state: state,
    isPending: isPending,
  });

  useEffect(() => {
    if (!isPending) {
      if (state.success) {
        toast.success(state.message || "Login successful!");
        router.push("/user");
      } else if (state.message) {
        toast.error(state.message || "Something went wrong!");
      }
    }
  }, [isPending, state.success, state.message]);

  if (isPending && !state.success) {
    return <FormSignUpSkeleton />;
  }

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        <form action={actions} className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">Sign Up</legend>
            <div className="auth-form__input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state?.input?.email}
                placeholder="Enter your email"
                className="auth-form__input"
              />
              {state?.error?.email && (
                <p className="auth-form__error-message">
                  {state.error.email[0]}
                </p>
              )}
            </div>

            <div className="auth-form__input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={state?.input?.password}
                placeholder="Enter your password"
                className="auth-form__input"
              />
              {state?.error?.password && (
                <p className="auth-form__error-message">
                  {state.error.password[0]}
                </p>
              )}
            </div>

            <div className="auth-form__input-group">
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input
                type="password"
                id="repeat-password"
                name="repeatPassword"
                defaultValue={state?.input?.repeatPassword}
                placeholder="Repeat your password"
                className="auth-form__input"
              />
              {state?.error?.repeatPassword && (
                <p className="auth-form__error-message">
                  {state.error.repeatPassword[0]}
                </p>
              )}
            </div>

            <div className="auth-form__button-container">
              <button
                type="submit"
                className="auth-form__submit-button"
                disabled={isPending}
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

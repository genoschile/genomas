"use client";

/* server actions */
import { submitSignUp } from "@/lib/actions/auth";

/* types */
import type { ActionResponse } from "@/lib/types/formTypes";

/* hooks */
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import "./formSignUp.css";

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

  return (
    <section className="sign-up">
      <div className="sign-up__container">
        <figure className="sign-up__logo-container">
          <img
            src="/images/genomas.png"
            className="sign-up__logo"
            alt="logo genomas"
          />
          <figcaption>Logo genomas</figcaption>
        </figure>

        <form action={actions} className="sign-up__form">
          <fieldset>
            <legend className="sign-up__title">Sign Up</legend>
            <div className="sign-up__input-group">
              <label htmlFor="email">Email:</label> 
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state?.input?.email}
                placeholder="Enter your email"
                className="sign-up__input"
              />
              {state?.error?.email && (
                <p className="sign-up__error-message">{state.error.email[0]}</p>
              )}
            </div>

            <div className="sign-up__input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={state?.input?.password}
                placeholder="Enter your password"
                className="sign-up__input"
              />
              {state?.error?.password && (
                <p className="sign-up__error-message">
                  {state.error.password[0]}
                </p>
              )}
            </div>

            <div className="sign-up__input-group">
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input
                type="password"
                id="repeat-password"
                name="repeatPassword"
                defaultValue={state?.input?.repeatPassword}
                placeholder="Repeat your password"
                className="sign-up__input"
              />
              {state?.error?.repeatPassword && (
                <p className="sign-up__error-message">
                  {state.error.repeatPassword[0]}
                </p>
              )}
            </div>

            <div className="sign-up__button-container">
              <button
                type="submit"
                className="sign-up__submit-button"
                disabled={isPending}
              >
                Create Account
              </button>

              <div>
                <p className="sign-up__login-text">
                  Already in GENOMAS?{" "}
                  <a href="/login" className="sign-up__login-link">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

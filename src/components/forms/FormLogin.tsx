"use client";

/* server actions */
import { submitLogin } from "@/lib/actions/auth";

/* types */
import type { ActionResponseWithoutRepeatPassword } from "@/lib/types/formTypes";
import { useRouter } from "next/navigation";

/* hooks */
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

/* styles */
import "./form.css";
import { AuthFormLogo } from "./components/AuthFormLogo";
import { AuthLink } from "./components/AuthLink";

const initialState: ActionResponseWithoutRepeatPassword = {
  success: false,
  message: "",
};

export default function FormLogin() {
  const [state, actions, isPending] = useActionState(submitLogin, initialState);
  const router = useRouter();

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
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        {/* Formulario */}
        <form action={actions} className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">Login</legend>

            {/* Campo de Email */}
            <div className="auth-form__input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state?.input?.email}
                placeholder="Enter your email"
                className="login__input"
              />
              {state?.error?.email && (
                <p className="auth-form__error-message">{state.error.email[0]}</p>
              )}
            </div>

            {/* Campo de Contraseña */}
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
                <p className="auth-form__error-message">{state.error.password[0]}</p>
              )}
            </div>

            <div className="auth-form__button-container">
              <button
                type="submit"
                className="auth-form__submit-button"
                disabled={isPending}
              >
                Login
              </button>

              <AuthLink
                text="New to Genomas?"
                textPost="Join Now"
                href="/signup"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

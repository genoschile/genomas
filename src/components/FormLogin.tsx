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
import "./formLogin.css"

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
    <section className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="/images/genomas.png"
            alt="logo genomas"
            className="login__image"
          />
        </div>

        {/* Título */}
        <h2 className="login__title">Login</h2>

        {/* Formulario */}
        <form action={actions} className="login__form">
          {/* Campo de Email */}
          <div className="login__field">
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={state?.input?.email}
              placeholder="Enter your email"
              className="login__input"
            />
            {state?.error?.email && (
              <p className="login__error">{state.error.email[0]}</p>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div className="login__field">
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={state?.input?.password}
              placeholder="Enter your password"
              className="login__input"
            />
            {state?.error?.password && (
              <p className="login__error">{state.error.password[0]}</p>
            )}
          </div>

          {/* Botón de Crear Cuenta */}
          <div className="login__button-container">
            <button
              type="submit"
              className="login__button"
              disabled={isPending}
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Texto de Login */}
        <p className="login__text">
          Are you not in GENOMAS yet?{" "}
          <a href="/login" className="login__link">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}

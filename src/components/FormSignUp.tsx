"use client";

/* server actions */
import { submitSignUp } from "@/lib/actions/auth";

/* types */
import type { ActionResponse } from "@/lib/types/formTypes";

/* hooks */
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function FormLogin() {
  const [state, actions, isPending] = useActionState(submitSignUp, initialState);
  const router = useRouter()

  console.log({
    initialState: initialState,
    state: state,
    isPending: isPending,
  });

  useEffect(() => {
    if (!isPending) {
      if (state.success) {
        toast.success(state.message || "Login successful!");
        router.push('/user')
      } else if (state.message) {
        toast.error(state.message || "Something went wrong!");
      }
    }
  }, [isPending, state.success, state.message]);

  return (
    <section className="flex items-center justify-center flex-shrink-0">
      <div className="w-full max-w-md p-4 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img
            src="/images/genomas.png"
            className="w-6/12 h-3/6 object-contain mb-6"
            alt="logo genomas"
          />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-text text-center mb-6">
          Sign Up
        </h2>

        {/* Formulario */}
        <form action={actions} className="space-y-4">
          {/* Campo de Email */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={state?.input?.email}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-color-secondary rounded-lg shadow-sm placeholder:text-color-placeholder"
            />

            {state?.error?.email && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.email[0]}
              </p>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={state?.input?.password}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-color-secondary rounded-lg shadow-sm placeholder:text-color-placeholder"
            />

            {state?.error?.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.password[0]}
              </p>
            )}
          </div>

          {/* Campo de Repetir Contraseña */}
          <div>
            <input
              type="password"
              id="repeat-password"
              name="repeatPassword"
              defaultValue={state?.input?.repeatPassword}
              placeholder="Repeat your password"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm border-color-secondary focus:outline-dotted placeholder:text-color-placeholder"
            />

            {state?.error?.repeatPassword && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.repeatPassword[0]}
              </p>
            )}
          </div>

          {/* Botón de Crear Cuenta */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-[50%] py-2 bg-btn-blue text-white font-semibold rounded-sm shadow-md hover:outline-dotted outline-white"
              disabled={isPending}
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Texto de Login */}
        <p className="text-sm font-semibold text-text text-center mt-4">
          Already in GENOMAS?{" "}
          <a
            href="/login"
            className="text-color-secondary font-bold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  );
}

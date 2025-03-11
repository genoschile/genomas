"use client";

/* server actions */
import { submitLogin } from "@/lib/actions/auth";

/* types */
import type { ActionResponseWithoutRepeatPassword } from "@/lib/types/formTypes";
import { useRouter } from "next/navigation";

/* hooks */
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const initialState: ActionResponseWithoutRepeatPassword = {
  success: false,
  message: "",
};

export default function FormLogin() {
  const [state, actions, isPending] = useActionState(submitLogin, initialState);
  const router = useRouter()

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
    <section className="flex items-center justify-center shrink-0">
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
          Login
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
              className="mt-1 block w-full px-4 py-2 border border-color-secondary rounded-lg shadow-xs placeholder:text-color-placeholder"
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
              className="mt-1 block w-full px-4 py-2 border border-color-secondary rounded-lg shadow-xs placeholder:text-color-placeholder"
            />

            {state?.error?.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.password[0]}
              </p>
            )}
          </div>

          {/* Botón de Crear Cuenta */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-[50%] py-2 bg-btn-blue text-white font-semibold rounded-xs shadow-md hover:outline-dotted outline-white"
              disabled={isPending}
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Texto de Login */}
        <p className="text-sm font-semibold text-text text-center mt-4">
          Are you not in GENOMAS yet?{" "}
          <a
            href="/login"
            className="text-color-secondary font-bold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}

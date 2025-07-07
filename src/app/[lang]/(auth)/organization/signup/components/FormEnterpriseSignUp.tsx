"use client";

/* styles */
import "@/components/forms/form.css";

import { AuthFormLogo } from "@/components/forms/components/AuthFormLogo";
import { AuthLink } from "@/components/forms/components/AuthLink";
import { submitSignUpEnterprise } from "@/core/use-cases/organization/auth";
import { useSessionContext } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { ActionResponse } from "@/lib/types/formTypes";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: {},
  input: {
    email: "",
    password: "",
    name: "",
    repeatPassword: "",
  },
};

export function FormSignUp() {
  const router = useRouter();

  const [state, action, pending] = useActionState(
    submitSignUpEnterprise,
    initialState
  );
  const { updateOrganization } = useSessionContext();

  const [showPassword, setShowPassword] = useState({
    password: false,
    repeatPassword: false,
  });

  const togglePasswordVisibility = (field: "password" | "repeatPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast.success(state.message || "Login successful!");

        updateOrganization({
          id: state.data?.id || "",
          email: state.data?.email || "",
          name: state.data?.name || "",
        });

        router.push("/genomas/enterprise");
      } else if (state.message) {
        toast.error(state.message || "Something went wrong!");
      }
    }
  }, [pending, state.success, state.message]);

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        <form action={action} className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">
              {"SignUp"} <small>enterprise</small>
            </legend>

            <div className="auth-form__input-group">
              <label htmlFor="email">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="auth-form__input"
              />

              {state?.error?.name && <p>{state.error.name}</p>}
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

              {state?.error?.email && <p>{state.error.email}</p>}
            </div>

            <div className="auth-form__input-group">
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                placeholder={`${
                  showPassword.password ? "Enter your password" : "********"
                }`}
                className="auth-form__input"
              />

              {showPassword.password ? (
                <FaEyeSlash
                  className="eyes-icons"
                  onClick={() => togglePasswordVisibility("password")}
                />
              ) : (
                <IoEyeSharp
                  className="eyes-icons"
                  onClick={() => togglePasswordVisibility("password")}
                />
              )}
            </div>

            <div className="auth-form__input-group">
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input
                type={showPassword.repeatPassword ? "text" : "password"}
                id="repeat-password"
                name="repeatPassword"
                placeholder={`${
                  showPassword.repeatPassword
                    ? "Repeat your password"
                    : "********"
                }`}
                className="auth-form__input"
              />

              {showPassword.repeatPassword ? (
                <FaEyeSlash
                  className="eyes-icons"
                  onClick={() => togglePasswordVisibility("repeatPassword")}
                />
              ) : (
                <IoEyeSharp
                  className="eyes-icons"
                  onClick={() => togglePasswordVisibility("repeatPassword")}
                />
              )}
              {state?.error?.password && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.error.password.map((error) => (
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
                href="/organization"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

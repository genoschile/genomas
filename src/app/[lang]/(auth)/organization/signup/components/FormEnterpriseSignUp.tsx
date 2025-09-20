"use client";

import "@/components/forms/form.css";

import { AuthFormLogo } from "@/components/forms/components/AuthFormLogo";
import { AuthLink } from "@/components/forms/components/AuthLink";
import { useSessionContext } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { routes } from "@/lib/api/routes";

type ActionResponse = {
  success: boolean;
  message: string;
  error: any;
  input: {
    email: string;
    password: string;
    name: string;
    repeatPassword: string;
  };
  data?: any;
};

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
  const { updateOrganization } = useSessionContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    repeatPassword: false,
  });

  const [state, setState] = useState<ActionResponse>(initialState);
  const [pending, setPending] = useState(false);

  const togglePasswordVisibility = (field: "password" | "repeatPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setState(initialState);

    try {
      const res = await fetch(routes.signUpEnterprise(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setState({
          success: false,
          message: data.message || "Something went wrong",
          error: data.data || {},
          input: form,
        });
        toast.error(data.message || "Error creating organization");
      } else {
        setState({
          success: true,
          message: data.message || "Organization created successfully",
          error: {},
          input: form,
          data: data.data,
        });
        toast.success(data.message || "Organization created successfully");

        updateOrganization({
          id: data.data.id,
          email: data.data.email,
          name: data.data.name,
        });

        router.push("/enterprise");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setState({
        success: false,
        message: "Unexpected error occurred",
        error: {},
        input: form,
      });
      toast.error("Unexpected error occurred");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        <form onSubmit={handleSubmit} className="auth-form__form" noValidate>
          <fieldset>
            <legend className="auth-form__title">
              SignUp <small>enterprise</small>
            </legend>

            <div className="auth-form__input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="auth-form__input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            {state?.error?.name && <p>{state.error.name}</p>}

            <div className="auth-form__input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="auth-form__input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            {state?.error?.email && <p>{state.error.email}</p>}

            <div className="auth-form__input-group">
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                placeholder={
                  showPassword.password ? "Enter your password" : "********"
                }
                className="auth-form__input"
                value={form.password}
                onChange={handleChange}
                required
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
                placeholder={
                  showPassword.repeatPassword
                    ? "Repeat your password"
                    : "********"
                }
                className="auth-form__input"
                value={form.repeatPassword}
                onChange={handleChange}
                required
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
            </div>
            {state?.error?.password && (
              <div>
                <p>Password must:</p>
                <ul>
                  {state.error.password.map((error: string) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="auth-form__button-container">
              <button
                type="submit"
                className="auth-form__submit-button"
                disabled={pending}
              >
                {pending ? "Creating..." : "Create Account"}
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

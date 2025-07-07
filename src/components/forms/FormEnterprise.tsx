"use client";

import "./form.css";

import Link from "next/link";
import { AuthLink } from "./components/AuthLink";
import { AuthFormLogo } from "./components/AuthFormLogo";
import { toast } from "react-toastify";
import { useActionState, useEffect, useState } from "react";
import { useTranslations } from "@/context/I18nClientProvider";
import { useRouter } from "next/navigation";

import { ActionResponseWithoutRepeatPassword } from "@/lib/types/formTypes";
import { submitLoginEnterprise } from "@/core/use-cases/organization/auth";
import { useSessionContext } from "@/hooks/useSession";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const initialState: ActionResponseWithoutRepeatPassword = {
  success: false,
  message: "",
  error: {},
  input: {
    email: "",
    password: "",
  },
};

export const FormEnterprice = () => {
  const [state, actions, isPending] = useActionState(
    submitLoginEnterprise,
    initialState
  );
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const { t } = useTranslations();

  const { updateOrganization, clearUser } = useSessionContext();

  const authTranslations = {
    title: t("auth.login.title"),
    emailLabel: t("auth.login.email.label"),
    emailPlaceholder: t("auth.login.email.placeholder"),
    passwordLabel: t("auth.login.password.label"),
    passwordPlaceholder: t("auth.login.password.placeholder"),
    submitButtonLabel: t("auth.login.button.submit"),
    submitButtonLabelPending: t("auth.login.button.loading"),
    newUserLink: t("auth.login.link.newUser"),
    joinNowLink: t("auth.login.link.joinNow"),
    loginSuccessToast: t("auth.login.toast.success"),
    loginErrorToast: t("auth.login.toast.error"),
  };

  useEffect(() => {
    if (!isPending) {
      if (state.success) {
        toast.success(state.message || "Login successful!");

        clearUser(); // Clear any previous user session
        // Set the organization in the session context
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
  }, [isPending, state.success, state.message]);

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        <form action={actions} className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">
              {authTranslations.title} <small>enterprise</small>
            </legend>

            {/* Campo de Email */}
            <div className="auth-form__input-group">
              <label htmlFor="email">{authTranslations.emailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state?.input?.email}
                placeholder={`${authTranslations.emailPlaceholder}`}
                className="login__input"
              />
              {state?.error?.email && (
                <p className="auth-form__error-message">
                  {state.error.email[0]}
                </p>
              )}
            </div>

            {/* Campo de Contraseña */}
            <div className="auth-form__input-group">
              <label htmlFor="password">{authTranslations.passwordLabel}</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                defaultValue={state?.input?.password}
                placeholder={`${
                  isPasswordVisible
                    ? authTranslations.passwordPlaceholder
                    : "********"
                }
                  `}
                className="auth-form__input"
              />
              {isPasswordVisible ? (
                <FaEyeSlash
                  className="eyes-icons"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeSharp
                  className="eyes-icons"
                  onClick={togglePasswordVisibility}
                />
              )}
              {state?.error?.password && (
                <p className="auth-form__error-message">
                  {state.error.password[0]}
                </p>
              )}
            </div>

            <div className="auth-form__button-container">
              <button
                type="submit"
                className="auth-form__submit-button"
                disabled={isPending}
              >
                {isPending
                  ? authTranslations.submitButtonLabelPending
                  : authTranslations.submitButtonLabel}
              </button>

              <div className="auth-form--or">
                <div></div>
                <strong>OR</strong>
                <div></div>
              </div>

              <Link href="/login" className="auth-form__submit-button">
                {"Continue with User ID"}
              </Link>

              <AuthLink
                text={authTranslations.newUserLink}
                textPost={authTranslations.joinNowLink}
                href="/organization/signup"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

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
import { useTranslations } from "@/context/I18nClientProvider";
import Link from "next/link";
import { useSessionContext } from "@/hooks/useSession";
import { update } from "tar";

const initialState: ActionResponseWithoutRepeatPassword = {
  success: false,
  message: "",
};

export default function FormLogin() {
  const [state, actions, isPending] = useActionState(submitLogin, initialState);
  const router = useRouter();

  const { updateUser } = useSessionContext();

  const { t } = useTranslations();

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

        if (!state.data) {
          toast.error("User data is missing!");
          return;
        }

        updateUser({
          id: state.data?.id || "",
          email: state.data?.email || "",
          name: state.data?.name || "",
          organizationId: state.data?.organizationId || "",
        });

        router.push("/genomas/user");
      } else if (state.message) {
        toast.error(state.message || "Something went wrong!");
      }
    }
  }, [state, updateUser]);

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        {/* Formulario */}
        <form action={actions} className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">
              {authTranslations.title}
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
                type="password"
                id="password"
                name="password"
                defaultValue={state?.input?.password}
                placeholder={`${authTranslations.passwordPlaceholder}`}
                className="auth-form__input"
              />
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

              <Link href="/organization" className="auth-form__submit-button">
                {"Continue with Enterprise ID"}
              </Link>

              <AuthLink
                text={authTranslations.newUserLink}
                textPost={authTranslations.joinNowLink}
                href="/signup"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

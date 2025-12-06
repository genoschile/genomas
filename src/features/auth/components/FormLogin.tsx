"use client";

/* types */
import { useRouter } from "next/navigation";

/* hooks */
import { useState } from "react";
import { toast } from "react-toastify";

/* styles */
import "./form.css";
import { AuthFormLogo } from "./AuthFormLogo";
import { AuthLink } from "./AuthLink";

/* icons */
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import Link from "next/link";

import { useTranslations } from "@/features/lang/context/I18nClientProvider";
import { useSessionContext } from "@/features/auth/hooks/useSession";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { loginSchema } from "@/features/auth/validation/user_login_validation";

export default function FormLogin() {
  const router = useRouter();

  const { loginUser } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isPending, setIsPending] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const { updateUser, clearUser } = useSessionContext();

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

  const handleSubmit = async (formData: FormData) => {
    setFormErrors({});
    setIsPending(true);

    clearUser();

    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedData = loginSchema.safeParse(rawData);

    if (!validatedData.success) {
      const errors = validatedData.error.format();
      setFormErrors({
        email: errors.email?._errors[0],
        password: errors.password?._errors[0],
      });
      setIsPending(false);
      return;
    }

    const { email, password } = validatedData.data;

    try {
      const loginResult = await loginUser(email, password);

      if (!loginResult.success || !loginResult.data) {
        toast.error(loginResult.message || authTranslations.loginErrorToast);
        setIsPending(false);
        return;
      }

      updateUser({
        id: loginResult.data.id,
        email: loginResult.data.email,
        name: loginResult.data.name,
        organizationId: loginResult.data.organizationId,
      });

      toast.success(authTranslations.loginSuccessToast);
      router.push("/user");
    } catch (error) {
      console.error(error);
      toast.error(authTranslations.loginErrorToast);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        {/* Formulario */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(new FormData(e.currentTarget));
          }}
          className="auth-form__form"
        >
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
                placeholder={`${authTranslations.emailPlaceholder}`}
                className="login__input"
              />
              {formErrors.email && (
                <p className="auth-form__error-message">{formErrors.email}</p>
              )}
            </div>

            {/* Campo de Contraseña */}
            <div className="auth-form__input-group">
              <label htmlFor="password">{authTranslations.passwordLabel}</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder={`${
                  isPasswordVisible
                    ? authTranslations.passwordPlaceholder
                    : "********"
                }`}
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

              {formErrors.password && (
                <p className="auth-form__error-message">
                  {formErrors.password}
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
                href="/organization/signup"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

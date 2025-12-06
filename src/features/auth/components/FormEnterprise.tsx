"use client";

import "./form.css";

import Link from "next/link";

import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslations } from "@/features/lang/context/I18nClientProvider";
import { useRouter } from "next/navigation";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSessionContext } from "@/features/auth/hooks/useSession";
import { AuthFormLogo } from "@/features/auth/components/AuthFormLogo";
import { AuthLink } from "@/features/auth/components/AuthLink";

export const FormEnterprice = () => {
  const router = useRouter();
  const { loginEnterprise } = useAuth();
  const { updateOrganization, clearUser, setAccessToken } = useSessionContext();

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

  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsPending(true);

    const { email, password } = input;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      setIsPending(false);
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      setIsPending(false);
      return;
    }

    try {
      const result = await loginEnterprise(email, password);

      if (!result.success) {
        toast.error(result.message || authTranslations.loginErrorToast);
        setIsPending(false);
        return;
      }

      toast.success(authTranslations.loginSuccessToast);

      clearUser();
      updateOrganization({
        id: result.data?.id || "",
        email: result.data?.email || "",
        name: result.data?.name || "",
      });

      if (result.data?.accessToken) {
        setAccessToken(result.data.accessToken);
      }

      if (!result.data?.accessToken) {
        toast.error("No access token received");
        setIsPending(false);
        return;
      }

      router.push("/enterprise");
    } catch (err) {
      console.error(err);
      toast.error(authTranslations.loginErrorToast);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />

        <form onSubmit={handleSubmit} className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">
              {authTranslations.title} <small>enterprise</small>
            </legend>

            <div className="auth-form__input-group">
              <label htmlFor="email">{authTranslations.emailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder={authTranslations.emailPlaceholder}
                className="login__input"
              />
              {errors.email && (
                <p className="auth-form__error-message">{errors.email}</p>
              )}
            </div>

            <div className="auth-form__input-group">
              <label htmlFor="password">{authTranslations.passwordLabel}</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder={
                  isPasswordVisible
                    ? authTranslations.passwordPlaceholder
                    : "********"
                }
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
              {errors.password && (
                <p className="auth-form__error-message">{errors.password}</p>
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
                Continue with User ID
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

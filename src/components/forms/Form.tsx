"use client";

import { AuthFormLogo } from "./components/AuthFormLogo";
import "./form.css";

import ButtonAuthForm from "./ButtonAuthForm";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  ActionResponse,
  ActionResponseWithoutRepeatPassword,
} from "@/lib/types/formTypes";

interface FormProps {
  children: React.ReactNode;
  submitAction: (
    prevState: ActionResponse | ActionResponseWithoutRepeatPassword | undefined,
    formData: FormData
  ) => Promise<
    ActionResponse | ActionResponseWithoutRepeatPassword | undefined
  >;
  initialState: ActionResponse | ActionResponseWithoutRepeatPassword;
  successToastMessage?: string;
  errorToastMessage?: string;
  legend?: string;
}

export default function Form({
  children,
  submitAction,
  initialState,
  successToastMessage,
  errorToastMessage,
  legend,
}: FormProps) {
  const [state, action] = useActionState(submitAction, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || successToastMessage || "Éxito!");
      router.push("/user");
    } else if (state?.message) {
      toast.error(state.message || errorToastMessage || "Error!");
    }
  }, [
    state?.success,
    state?.message,
    router,
    successToastMessage,
    errorToastMessage,
  ]);

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <AuthFormLogo />
        <form action={action} className="auth-form__form">
          <fieldset>
            <legend className="auth-form__title">{legend}</legend>
            {children}
            <ButtonAuthForm />
          </fieldset>
        </form>
      </div>
    </section>
  );
}

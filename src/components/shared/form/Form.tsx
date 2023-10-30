import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../app/hooks/useActions";
import Loader from "../../utils/Loader";
import { FormData } from "../../../app/types";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import SubmitButton from "./SubmitButton";
import NavigationPrompt from "./NavigationPromt";
import { useAuthSelectors } from "./useAuthSelectors";
import FormHeader from "./FormHeader";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import RememberMeCheckbox from "./RememberMeCheckbox";

const Form: React.FC<{ formType: "login" | "register" }> = ({ formType }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const navigate = useNavigate();
  const { login, register: registerUser } = useActions();
  const { isAuthenticated, isLoading, regLoading, registerSuccess, error } =
    useAuthSelectors();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [secondPassword, setSecondPassword] = useState<string>("");

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const comparePasswords = useCallback(() => {
    if (password !== secondPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [clearErrors, password, secondPassword, setError]);

  const onSubmit = handleSubmit(async () => {
    try {
      if (formType === "login") {
        await login({ email, password, rememberMe });
      } else if (formType === "register") {
        await registerUser({ email, password });
      }
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    if (formType === "register") {
      comparePasswords();
    }
    if (formType === "register" && registerSuccess) {
      navigate("/login");
    } else if (formType === "login" && isAuthenticated) {
      navigate("/profile");
    }
  }, [
    comparePasswords,
    password,
    secondPassword,
    formType,
    navigate,
    isAuthenticated,
    registerSuccess,
  ]);

  return (
    <>
      {isLoading || regLoading ? (
        <Loader />
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-[26rem] h-[34.5rem] 
                 mt-14 bg-white drop-shadow-form-shadow"
        >
          <FormHeader formType={formType} />
          <EmailInput register={register} setEmail={setEmail} />

          <PasswordInput
            formType={formType}
            control={control}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            setPassword={setPassword}
            errors={errors}
            error={error}
          />
          {formType === "register" && (
            <ConfirmPasswordInput
              control={control}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              setSecondPassword={setSecondPassword}
              errors={errors}
            />
          )}
          {formType === "login" && (
            <RememberMeCheckbox setRememberMe={setRememberMe} />
          )}
          {formType === "login" && (
            <span
              className="self-end pr-12
                        pb-16 font-medium"
            >
              Forgot Password?
            </span>
          )}
          <SubmitButton formType={formType} isSubmitting={isSubmitting} />
          <NavigationPrompt formType={formType} />
        </form>
      )}
    </>
  );
};

export default Form;

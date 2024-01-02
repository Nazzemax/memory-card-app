import React from "react";
import { AiFillEye } from "react-icons/ai";
import { useForm, FieldErrors } from "react-hook-form";
import PasswordError from "./PasswordError";
import { passwordValidationRules } from "./validationRules";

interface PasswordInputProps {
  formType: "login" | "register";
  val: string;
  togglePasswordVisibility: () => void;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  errors:FieldErrors<FormData>;
  error:string;
  register:ReturnType<typeof useForm>['register']
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  formType,
  val,
  togglePasswordVisibility,
  setPassword,
  showPassword,
  errors,
  register,
  error
}) => {

  return (
      <label htmlFor="password" className="text-sm opacity-50 ml-10 pt-6 relative">
        Password
        <input
          {...register("password", passwordValidationRules(formType))}
          value={val}
          type={showPassword ? 'text':'password'}
          id="password"
          className="w-80 h-8 border-opacity-20 enabled:opacity-100 font-medium border-b outline-none border-black"
          style={{ borderBottomWidth: "0.09888rem" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <AiFillEye
          className="absolute right-16 top-12 text-2xl cursor-pointer"
          onClick={togglePasswordVisibility}
        />
        <PasswordError errors={errors}  error={error} />
      </label>
    
  );
};

export default PasswordInput;

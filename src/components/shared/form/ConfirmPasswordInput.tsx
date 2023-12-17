import React from "react";
import { AiFillEye } from "react-icons/ai";
import { useForm, FieldErrors } from "react-hook-form";
import PasswordError from "./PasswordError";
import { confirmPasswordValidationRules } from "./validationRules";

interface PasswordInputProps {
  togglePasswordVisibility: () => void;
  setSecondPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  errors:FieldErrors<FormData>;
  register:ReturnType<typeof useForm>['register']
}

const ConfirmPasswordInput: React.FC<PasswordInputProps> = ({
  togglePasswordVisibility,
  setSecondPassword,
  showPassword,
  errors,
  register
}) => {


  return (
  
      <label htmlFor="secondPassword" className="text-sm opacity-50 ml-10 pt-6 relative">
        Password
        <input
          {...register("secondPassword", confirmPasswordValidationRules)}
          type={showPassword ? 'text':'password'}
          id="password"
          className="w-80 h-8 border-opacity-20 enabled:opacity-100 font-medium border-b outline-none border-black"
          style={{ borderBottomWidth: "0.09888rem" }}
          onChange={(e) => {
            setSecondPassword(e.target.value);
          }}
        />
        <AiFillEye
          className="absolute right-16 top-12 text-2xl cursor-pointer"
          onClick={togglePasswordVisibility}
        />
        <PasswordError errors={errors} />
      </label>
    
  );
};

export default ConfirmPasswordInput;

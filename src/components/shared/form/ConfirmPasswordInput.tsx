import React from "react";
import { AiFillEye } from "react-icons/ai";
import { Controller } from "react-hook-form";
import PasswordError from "./PasswordError";
import { confirmPasswordValidationRules } from "./validationRules";

const ConfirmPasswordInput: React.FC<{
  control: any;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  setSecondPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: any;
}> = ({
  control,
  showPassword,
  togglePasswordVisibility,
  setSecondPassword,
  errors,
}) => {
  return (
    <label
      htmlFor="secondPassword"
      className="text-sm opacity-50 ml-10 pt-6 relative mb-14"
    >
      Confirm password
      <Controller
        defaultValue=""
        name="secondPassword"
        control={control}
        rules={confirmPasswordValidationRules}
        render={({ field }) => (
          <input
            {...field}
            type={showPassword ? "text" : "password"}
            id="secondPassword"
            className="w-80 h-8 border-opacity-20 enabled:opacity-100 font-medium border-b outline-none border-black"
            onChange={(e) => {
              field.onChange(e);
              setSecondPassword(e.target.value);
            }}
          />
        )}
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

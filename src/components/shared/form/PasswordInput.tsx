import React from "react";
import { AiFillEye } from "react-icons/ai";
import { Controller } from "react-hook-form";
import PasswordError from "./PasswordError";
import { passwordValidationRules } from "./validationRules";

const PasswordInput: React.FC<{
  formType: "login" | "register";
  control: any;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: any;
  error: string | undefined;
}> = ({
  formType,
  control,
  showPassword,
  togglePasswordVisibility,
  setPassword,
  errors,
  error,
}) => {
  return (
    <label
      htmlFor="password"
      className="text-sm opacity-50 ml-10 pt-6 relative"
    >
      Password
      <Controller
        defaultValue=""
        name="password"
        control={control}
        rules={passwordValidationRules(formType)}
        render={({ field }) => (
          <input
            {...field}
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-80 h-8 border-opacity-20 enabled:opacity-100 font-medium border-b outline-none border-black"
            style={{ borderBottomWidth: "0.09888rem" }}
            onChange={(e) => {
              field.onChange(e);
              setPassword(e.target.value);
            }}
          />
        )}
      />
      <AiFillEye
        className="absolute right-16 top-12 text-2xl cursor-pointer"
        onClick={togglePasswordVisibility}
      />
      <PasswordError errors={errors} error={error} />
    </label>
  );
};

export default PasswordInput;

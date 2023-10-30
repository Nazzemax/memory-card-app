import React from "react";

const SubmitButton: React.FC<{
  formType: "login" | "register";
  isSubmitting: boolean;
}> = ({ formType, isSubmitting }) => {
  return (
    <input
      type="submit"
      className="bg-accent-blue hover:bg-blue-700 
                   text-base text-center text-white shadow-btn-shadow
                   rounded-3xl w-80 min-h-[2.25rem] h-9 self-center cursor-pointer"
      disabled={isSubmitting}
      value={formType === "login" ? "Sign in" : "Sign Up"}
    />
  );
};

export default SubmitButton;

import React from "react";
import { Link } from "react-router-dom";

const NavigationPrompt: React.FC<{ formType: "login" | "register" }> = ({
  formType,
}) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-center mt-8 mb-2.5 opacity-50">
        {formType === "login"
          ? "Don't have an account yet?"
          : "Already have an account?"}
      </p>
      <Link
        to={formType === "login" ? "/register" : "/home"}
        className="text-center mb-10 underline text-blue-500"
      >
        {formType === "login" ? "Sign Up" : "Sign in"}
      </Link>
    </div>
  );
};

export default NavigationPrompt;

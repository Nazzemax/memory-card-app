import React from "react";

const FormHeader: React.FC<{ formType: "login" | "register" }> = ({
  formType,
}) => {
  return (
    <div
      className="text-3xl pb-10 font-semibold
                       text-center pt-10"
    >
      {formType === "login" ? "Sign in" : "Sign Up"}
    </div>
  );
};

export default FormHeader;

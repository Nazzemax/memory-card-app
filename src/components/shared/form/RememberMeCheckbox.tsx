import React from "react";
import Checkbox from "../Checkbox";

const RememberMeCheckbox: React.FC<{
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setRememberMe }) => {
  return (
    <div className="flex pb-7 pt-6">
      <Checkbox />
      <span className="pl-4 font-medium" onClick={() => setRememberMe(true)}>
        Remember me
      </span>
    </div>
  );
};

export default RememberMeCheckbox;

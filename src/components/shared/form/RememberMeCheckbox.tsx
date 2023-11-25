import React from "react";
import Checkbox from "../Checkbox";

const RememberMeCheckbox: React.FC<{
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setRememberMe }) => {
  return (
    <div className="flex pb-7 pt-6">
      <Checkbox setRememberMe={setRememberMe} />
    </div>
  );
};

export default RememberMeCheckbox;

import { useState } from "react";
import { MdDone } from "react-icons/md";

const Checkbox: React.FC<{setRememberMe:React.Dispatch<React.SetStateAction<boolean>>}> = ({setRememberMe}): React.JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="flex items-center pl-10">
        <input
          type="checkbox"
          id="custom-checkbox"
          checked={isChecked}
          onChange={toggleCheckbox}
          className="hidden"
        />
        <label htmlFor="custom-checkbox" className="cursor-pointer">
          <div
            className="w-5 h-5 border bg-blue-500
            border-gray-400 rounded-md flex items-center
             justify-center"
          >
            {isChecked && <MdDone className="text-white" />}
          </div>
        </label>
      </div>
       <span className="pl-4 font-medium cursor-pointer" onClick={() => {
        setRememberMe(true)
        toggleCheckbox()
       }}>
        Remember me
      </span>
    </>
  );
};

export default Checkbox;

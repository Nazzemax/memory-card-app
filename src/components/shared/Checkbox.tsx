import { useState } from 'react'
import { MdDone } from 'react-icons/md'

const Checkbox: React.FC = () => {

    const [isChecked, setIsChecked] = useState(false)

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
        console.log(isChecked)
    }

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
            <div className="w-5 h-5 border bg-blue-500  border-gray-400 rounded-md flex items-center justify-center">
              {isChecked && (
                <MdDone className='text-white' />
              )}
            </div>
          </label>
        </div>
        </>
      );
    };
    
    export default Checkbox;
    
    
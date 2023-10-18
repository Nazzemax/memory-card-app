import { useState } from 'react'
import { useForm } from "react-hook-form"
import { AiFillEye } from 'react-icons/ai'
import Checkbox from './Checkbox';

type Login = {
    email:string;
    password:string;
}

const Form:React.FC = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>()

    const onSubmit = handleSubmit((data) => console.log(data))

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility  = ():void => {
        setShowPassword(!showPassword)
    }

  return (
    <form 
        onSubmit={onSubmit}
        className="flex flex-col w-[26rem] h-[33rem] mt-14 bg-white drop-shadow-form-shadow"
        >
        <div className="text-3xl pb-10 font-semibold text-center pt-10">Sign in</div>
        <label className="text-sm opacity-50 pl-10" htmlFor="email">Email</label>
        <input 
            type='email' 
            id='email' 
            className="w-80 h-8 border-opacity-20 ml-10 font-medium border-b border-black outline-none" 
            style={{ borderBottomWidth:'0.09888rem'}} {...register('email')} 
            />
        <label 
            className="text-sm opacity-50 ml-10 pt-6 relative pb-6" 
            htmlFor="password">Password
            <input 
                type={showPassword ? 'text':'password'} 
                id="password" 
                className="w-80 h-8 border-opacity-20 enabled:opacity-100 font-medium border-b outline-none border-black" 
                style={{borderBottomWidth:'0.09888rem'}} {...register('password')} 
            />
            <AiFillEye 
                className='absolute right-16 top-12 text-2xl cursor-pointer'
                onClick={togglePasswordVisibility} 
                />
        </label>

        <div className="flex pb-7">
            <Checkbox />
            <span className='pl-4 font-medium'>Remember me</span>
        </div>

        <span className="self-end pr-12 pb-16 font-medium">Forgot Password?</span>
        
        <button 
            type="button"
            className='bg-accent-blue hover:bg-blue-700 text-base text-center text-white shadow-btn-shadow rounded-3xl w-80 h-9 self-center mb-8'
            onClick={() => {
                setValue('email','nya-admin@nya.nya')
                setValue('password','1qazxcvBG')
            }}
            
            >Sign in</button>
        <div className="flex flex-col items-center">
            <a className='text-center mb-2.5 opacity-50' href="">Already have an account?</a>
            <a href="" className="text-center mb-10 underline text-blue-500">Sign Up</a>
        </div>
           
    </form>
  )
}

export default Form
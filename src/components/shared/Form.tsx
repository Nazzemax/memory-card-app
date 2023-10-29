import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import Checkbox from "./Checkbox";
import { useActions } from "../../app/hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import Loader from "../utils/loader";

interface LoginData  {
    email:string;
    password:string;
    rememberMe:boolean;
}

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const navigate = useNavigate()

  const { login } = useActions()

  const isAuthenticated = useAppSelector((state:RootState) => state.auth.isAuthenticated)
  const isLoading = useAppSelector((state:RootState) => state.auth.isLoading)

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit( async () => {
    try {
        await login({email, password, rememberMe})
        if(!isAuthenticated) {
            navigate('/')
        } else {
            navigate('/profile')
        }
    } catch(e) {
        console.log(e)
    }
  })

  return <>
   {isLoading ? <Loader /> : (<form
      onSubmit={onSubmit}
      className="flex flex-col w-[26rem] h-[33rem] 
        mt-14 bg-white drop-shadow-form-shadow"
    >
      <div
        className="text-3xl pb-10 font-semibold
                   text-center pt-10"
      >
        Sign in
      </div>
      <label 
            className="text-sm opacity-50 pl-10" 
            htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="w-80 h-8 border-opacity-20 ml-10 
            font-medium border-b border-black outline-none"
        style={{ borderBottomWidth: "0.09888rem" }}
        {...register("email")}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <label
        className="text-sm opacity-50 ml-10 pt-6 relative pb-6"
        htmlFor="password"
      >
        Password
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="w-80 h-8 border-opacity-20 
                enabled:opacity-100 font-medium border-b
                 outline-none border-black"
          style={{ borderBottomWidth: "0.09888rem" }}
          {...register("password")}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <AiFillEye
          className="absolute right-16 top-12 text-2xl cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      </label>

      <div className="flex pb-7">
        <Checkbox />
        <span 
            className="pl-4 font-medium"
            onClick={() => setRememberMe(true)}
            >
                Remember me
        </span>
      </div>

      <span className="self-end pr-12
                     pb-16 font-medium">Forgot Password?</span>
    
    <input
        type="submit"
        className="bg-accent-blue hover:bg-blue-700 
            text-base text-center text-white shadow-btn-shadow
             rounded-3xl w-80 h-9 self-center mb-8 cursor-pointer"
        value='Sign in'
              />
        
      <div className="flex flex-col items-center">
        <p className="text-center mb-2.5 opacity-50">
          Don't have an account yet?
        </p>
        <a href="/register" className="text-center mb-10 underline text-blue-500">
          Sign Up
        </a>
      </div>
    </form> ) }
    </>
  ;
};

export default Form;
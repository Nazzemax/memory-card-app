import { useForm } from "react-hook-form";

const EmailInput: React.FC<{
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  val:string;
  register:ReturnType<typeof useForm>['register']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors:any;
}> = ({ setEmail, val, register, errors }) => {

  return (
    <>
      <label htmlFor="email" className="text-sm opacity-50 pl-10">
        Email
      <br />
      <input
        value={val}
        type="email"
        id="email"
        className="w-80 h-8 border-opacity-20 
                     font-medium border-b border-black outline-none"
        style={{ borderBottomWidth: "0.09888rem" }}
        {...register("email", { required: true, minLength: 5 })}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      {errors.email?.type ==='required' && (
        <span className="text-red-600 block font-bold text-1xl">
          Email is required
        </span>
      ) }
      </label>
    </>
  );
};

export default EmailInput;

const EmailInput: React.FC<{
  register: any;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  val:string;
}> = ({ register, setEmail, val }) => {
  return (
    <>
      <label htmlFor="email" className="text-sm opacity-50 pl-10">
        Email
      </label>
      <input
        value={val}
        type="email"
        id="email"
        className="w-80 h-8 border-opacity-20 ml-10 
                     font-medium border-b border-black outline-none"
        style={{ borderBottomWidth: "0.09888rem" }}
        {...register("email", { required: true, minLength: 5 })}
        onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );
};

export default EmailInput;

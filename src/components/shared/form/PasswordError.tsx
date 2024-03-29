const PasswordError: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any
  error?: string;
}> = ({ errors, error }) => {
  return (
    <>
      {errors?.confirmPassword && (
        <span className="text-red-600 block font-bold text-1xl ">
          {errors?.confirmPassword.message}
        </span>
      )}

      {errors?.password && (
        <span className="text-red-600 block font-bold text-1xl">
          {errors?.password.message || error}
        </span>
      )}
    </>
  );
};

export default PasswordError;

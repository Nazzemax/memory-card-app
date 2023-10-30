const PasswordError: React.FC<{
  errors: any;
  error?: string;
}> = ({ errors, error }) => {
  return (
    <>
      {errors?.confirmPassword && (
        <span className="text-red-600 font-bold text-1xl">
          {errors?.confirmPassword.message}
        </span>
      )}
      {errors?.password && (
        <span className="text-red-600 font-bold text-1xl">
          {error || errors?.password.message}
        </span>
      )}
    </>
  );
};

export default PasswordError;

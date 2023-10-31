import Button from "../shared/Button";
import Logo from "../../assets/logo.svg";
import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import { ToastContainer } from "react-toastify";

const Header: React.FC = (): React.JSX.Element => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div
      className=" w-screen px-32 mx-auto shadow-header-shadow
                       flex items-center justify-between max-h-16 h-16"
    >
      <img src={Logo} alt="logo" />
      <ToastContainer autoClose={3000} />
      {!isAuthenticated ? (
        <Button />
      ) : (
        <div className="flex items-center gap-x-3">
          <p className="border-b border-dashed border-black font-medium text-base leading-6">
            {user.name}
          </p>
          <img
            className="rounded-full shrink-0 w-9 h-9"
            src={user?.avatar || "https://placehold.co/36x36"}
            alt="Avatar of user"
          />
        </div>
      )}
    </div>
  );
};

export default Header;

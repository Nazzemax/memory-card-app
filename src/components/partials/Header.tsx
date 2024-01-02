import Button from "../shared/Button";
import Logo from "../../assets/logo.svg";
import ProfileIcon from "../../assets/profileIcon.svg?react";
import LogoutIcon from "../../assets/logoutLabel.svg?react";
import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useActions } from "../../app/hooks/useActions";
import { useEffect, useRef, useState } from "react";

const Header: React.FC = (): React.JSX.Element => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.user.isAuthenticated
  );

  const { user } = useAppSelector((state) => state.auth.user);

  const { logout } = useActions();

  const [isShowing, setIsShowing] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
  };

  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsShowing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



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
        <div
          ref={tooltipRef}
          onMouseEnter={() => setIsShowing(true)}
          className="flex relative items-center gap-x-3"
        >
          <p className="border-b border-dashed border-black font-medium text-base leading-6">
            {user?.name}
          </p>
          <img
            loading="lazy"
            className="rounded-full shrink-0 w-9 h-9"
            src={user?.avatar || "https://placehold.co/36x36"}
            alt="Avatar of user"
          />

          {isShowing ? (
            <div
              onMouseLeave={() => setIsShowing(false)}
              className="transition ease-linear absolute shadow flex flex-col justify-evenly top-11 right-3
              bg-[url('https://cdn.builder.io/api/v1/image/assets/TEMP/5d55dd74-9e13-45bb-b38e-7515a926145d?')]
              w-[122px] h-[104px] fill-white stroke-[1px] stroke-stone-300 overflow-hidden"
            >
              <Link
                to="/profile"
                className="z-10 stroke-black hover:stroke-red-500 hover:text-red-500
                   cursor-pointer flex items-center justify-between mr-[28px] ml-[20px]"
              >
                <ProfileIcon className="" />
                <div className="w-11 ml-3 text-sm">Profile</div>
              </Link>
              <button
                onClick={handleLogout}
                className="stroke-black hover:stroke-red-500 hover:text-red-500 cursor-pointer 
                z-10 flex items-center justify-between mr-[20px] ml-[20px]"
              >
                <LogoutIcon />
                <div className="w-14 text-sm">Log out</div>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import { logout } from "../../features/auth/AuthActions";
import { selectUser } from "../../features/auth/LoginSlice";
import Loader from "../utils/Loader";
import leftArrow from "../../assets/leftArrow.svg";
import photoLabel from "../../assets/photoLabel.svg";
import editLabel from "../../assets/edit.svg";
import logoutLabel from "../../assets/logoutLabel.svg";
import { useActions } from "../../app/hooks/useActions";
import React from "react";

const Profile: React.FC = (): React.JSX.Element => {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const { logoutUser } = useActions();

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const handleLogout = () => {
    logoutUser();
    logout();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-full px-[8rem] align-left grow">
          <div className="flex items-center mt-6">
            <img src={leftArrow} alt="" />
            <span className="align-left pl-2 text-sm leading-6">
              Back to Packs List
            </span>
          </div>
          <div className="flex justify-center">
            <form
              className="w-[25rem] h-[22rem] 
            mt-4 bg-white drop-shadow-form-shadow"
            >
              <div
                className="text-3xl pb-6 font-semibold
                    text-center pt-6"
              >
                Personal information
              </div>
              <div className="relative mx-auto h-24 w-24">
                <img
                  className="mx-auto rounded-full"
                  src="https://placehold.co/96x96"
                  alt=""
                />
                <label className="cursor-pointer" htmlFor="image">
                  <input
                    type="file"
                    accept="image/"
                    id="image"
                    className="hidden"
                  />
                  <img
                    className="absolute -right-0.5 bottom-0.5"
                    src={photoLabel}
                    alt=""
                  />
                </label>
              </div>
              {isEditing ? (
                <span className="flex items-center flex-col">
                  <label
                    className="pl-10 self-start text-sm opacity-50"
                    htmlFor="name"
                  >
                    Nickname
                  </label>
                  <div className="wrapper relative">
                    <input
                      id="name"
                      type="text"
                      value={user.name}
                      className="w-80 h-8 border-opacity-20 focused:opacity-100 font-medium border-b outline-none border-black"
                      style={{ borderBottomWidth: "0.09888rem" }}
                    />
                    <input
                      type="submit"
                      value="SAVE"
                      className="bg-accent-blue hover:bg-blue-700 text-sm
                                text-center text-white shadow-btn-shadow
                                rounded cursor-pointer absolute opacity-100 right-3 bottom-1 w-[3.25rem;] h-6"
                    />
                  </div>
                </span>
              ) : (
                <div>
                  <div className="flex justify-center gap-x-2 items-center pt-3">
                    <div className="text-center leading-6 text-xl font-medium">
                      {user?.name}
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-4 h-4"
                    >
                      <img src={editLabel} alt="" />
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-4 text-center opacity-50 text-sm">
                gmail.com2wdwe
              </div>

              <button
                onClick={handleLogout}
                className="mx-auto bg-[#FCFCFC;] shadow-logout-shadow 
                           rounded-3xl mt-7 flex items-center justify-center w-32 h-9
                           hover:bg-gray-200 transition duration-1000"
              >
                <img className="pr-1 w-4 h-4" src={logoutLabel} alt="" />
                <span className="text-center">Log out</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

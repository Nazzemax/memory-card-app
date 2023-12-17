import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import Loader from "../utils/Loader";
import leftArrow from "../../assets/leftArrow.svg";
import photoLabel from "../../assets/photoLabel.svg";
import editLabel from "../../assets/edit.svg";
import logoutLabel from "../../assets/logoutLabel.svg";
import { useActions } from "../../app/hooks/useActions";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileFormData } from "../../app/types";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/auth/LoginSlice";

const Profile: React.FC = (): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileFormData>();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector((state: RootState) => state.auth.user.isLoading);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [avatar, setAvatar] = React.useState<string>(
    user?.avatar ? user?.avatar : ""
  );
  const [name, setName] = React.useState<string>(user?.name || "");
  const [error, setError] = React.useState<string | null>(null);

  const { updateProfile, logout } = useActions();

  const onSubmit: SubmitHandler<ProfileFormData> = async () => {
    updateProfile({ name, avatar });
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      if (file.size > 400 * 1024) {
        setError("File size should be less than 400KB");
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };

      reader.onerror = (error) => {
        setError(`Error reading file: ${error}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {isLoading ? (
        <Loader h="h-screen" />
      ) : (
        <div className="max-w-full px-[8rem] align-left grow">
          <div className="">
            <Link className="flex items-center mt-6 w-40" to="/cards">
              <img src={leftArrow} alt="" />

              <span className="align-left pl-2 text-sm leading-6">
                Back to Packs List
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
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
                  src={avatar ? avatar : "https://placehold.co/96x96"}
                  alt="profile picture"
                />
                <label className="cursor-pointer" htmlFor="image">
                  <input
                    type="file"
                    disabled={!isEditing}
                    {...register("avatar")}
                    accept="image/"
                    id="image"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <img
                    className="absolute -right-0.5 bottom-0.5"
                    src={photoLabel}
                    alt=""
                  />
                </label>
                {errors.avatar && <p>{errors.avatar.message}</p>}
              </div>
              {isEditing ? (
                <span className="flex items-center">
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
                      value={name}
                      {...register("name", {
                        required: "Name is required",
                        minLength: 3,
                        maxLength: 50,
                      })}
                      onChange={(e) => setName(e.target.value)}
                      className="w-80 h-8 border-opacity-20 focused:opacity-100 font-medium border-b outline-none border-black"
                      style={{ borderBottomWidth: "0.09888rem" }}
                    />
                    <input
                      type="submit"
                      value="SAVE"
                      disabled={isSubmitting}
                      className="bg-accent-blue hover:bg-blue-700 text-sm
                                text-center text-white shadow-btn-shadow
                                rounded cursor-pointer absolute opacity-100 right-3 bottom-1 w-[3.25rem;] h-6"
                    />
                  </div>
                  {errors.name && (
                    <p className="pl-10 pt-2 self-start text-red-700 text-sm">
                      {errors?.name.message}
                    </p>
                  )}
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
                  {error && (
                    <p className="text-center text-red-700 text-sm">{error}</p>
                  )}
                </div>
              )}

              <div className="pt-4 text-center opacity-50 text-sm">
                {user?.email || ""}
              </div>
            </form>
            <div className="flex flex-center z-10 -mt-20">
              <button
                onClick={handleLogout}
                className="mx-auto bg-[#FCFCFC;] shadow-logout-shadow 
                           rounded-3xl flex items-center justify-center w-32 h-9
                           hover:bg-gray-200 transition duration-1000"
              >
                <img className="pr-1 w-4 h-4" src={logoutLabel} alt="" />
                <span className="text-center">Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

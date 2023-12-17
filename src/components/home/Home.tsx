import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import Form from "../shared/form/Form";
import { checkCookies } from "../../features/auth/AuthActions";

const Home: React.FC = (): React.JSX.Element => {

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.user.isAuthenticated
  );
    
  useEffect(() => {
    if (!isAuthenticated) {
      checkCookies(dispatch);
    }
  }, [isAuthenticated, dispatch]);

  return (
    <main className="flex mx-auto px-32" style={{ justifyContent: "center" }}>
      <Form formType="login" />
    </main>
  );
};

export default Home;

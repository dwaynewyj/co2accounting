import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "../components/page-loader";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({
        screen_hint: "signup",
        redirectUri: `${process.env.REACT_APP_AUTH0_CALLBACK_URL}/main`,
      });
    } else {
      navigate("/main");
    }
  }, []);

  return <div></div>;
};
export default SignUp;

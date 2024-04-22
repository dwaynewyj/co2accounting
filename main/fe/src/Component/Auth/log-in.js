import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      // loginWithRedirect({
      //   screen_hint: "login",
      //   redirectUri: `${process.env.REACT_APP_AUTH0_CALLBACK_URL}/main`,
      // });
      navigate("/main");
    } else {
      navigate("/main");
    }
  }, []);

  return <div></div>;
};
export default LogIn;

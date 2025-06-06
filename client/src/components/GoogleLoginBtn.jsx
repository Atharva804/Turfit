import { GoogleLogin } from "@react-oauth/google";
import axios from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function GoogleLoginBtn(role) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("/auth/google", {
        idToken: credentialResponse.credential,
        role: role,
      });
      dispatch(setUser(res.data.user));
      navigate("/");
      // Save to Redux
    } catch (err) {
      console.error("Google Auth Error", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => alert("Login Failed")}
      shape="rectangular"
    />
  );
}

export default GoogleLoginBtn;

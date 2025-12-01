import { FaGoogle } from "react-icons/fa";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { saveUserInfo } from "../../utils/utils";
import toast from "react-hot-toast";
const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        authMethod: "google",
      };
      await saveUserInfo(userInfo);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <Button
      onClick={handleGoogleSignIn}
      className="w-full duration-500"
      variant="outline"
      icon={<FaGoogle />}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
